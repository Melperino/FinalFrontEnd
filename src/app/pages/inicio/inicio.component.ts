import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  constructor(private authenticationService:AuthenticationService) { }
  //currentUserValue = this.authenticationService.currentUserValue
  
  ngOnInit(): void {
    //document.getElementById("myImg").setAttribute('src', this.currentUserValue.urlPhoto);
  }

}
