import { Component, OnInit } from '@angular/core';
import { NorthwindService } from 'src/app/services/northwind.service';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-top5',
  templateUrl: './top5.component.html',
  styleUrls: ['./top5.component.scss']
})
export class Top5Component implements OnInit {

  constructor(private northwindService: NorthwindService) { }

  pieChartLabels: Label[] = [];
  pieChartData: number[] = [];

  defaultBindingsList = [
    { value: 1, label: 'Cliente' },
    { value: 2, label: 'Producto' },
    { value: 3, label: 'Empleado' },
  ];
  mesesList = [];
  aniosList = [];
  nombresList = [];

  selectedDimension = null;
  selectedMeses: any[] = [];
  selectedAnios: any[] = [];
  selectedCustomer: any[] = [];

  selectedParams: any = {
    dimension: '',
    clients: [],
    years: [],
    months: [],
  };
  ngOnInit(): void {
    this.selectedDimension = this.defaultBindingsList[0];

    this.northwindService.getSelectsData().subscribe((data: any) => {

      this.mesesList = data.meses;
      this.aniosList = data.anios;
      this.nombresList = data.clientes;

      this.updateGraphic();
    });
  }

  onChangeDimension($event) {
    this.selectedParams.dimension = $event.label;
    this.updateGraphic();
  }

  onChangeMeses($event) {
    this.selectedParams.months = $event;
    this.updateGraphic();
  }

  onChangeAnios($event) {
    this.selectedParams.years = $event;
    this.updateGraphic();
  }

  onChangeCustomer($event) {
    this.selectedParams.clients = $event;
    this.updateGraphic();
  }

  updateGraphic() {
    const dimension = this.selectedParams.dimension;
    const { clients, years, months } = this.selectedParams;
    const body = { clients, years, months };
    for (const key in body) {
      if (body[key].length === 0) {
        body[key] = [''];
      }
    }

    this.northwindService.getGraphicsData(dimension ? dimension : 'Cliente', body).subscribe((graphic: any) => {

        const result = graphic.datosTabla.reduce((rv, x) => {
          (rv[x.descripcion] = rv[x.descripcion] || []).push(x);
          return rv;
        }, {});

        let total = 0;
        const names: string[] = [];
        const values: number[] = [];
        for (const key in result) {
          names.push(key);
          for (const value of result[key]) {
            total += Math.round(value.valor);
          }
          values.push(total);
          total = 0;
        }

        this.pieChartLabels = names.length !== 0 ? names : [''];
        this.pieChartData = values.length !== 0 ? values : [0];
    });
  }
}
