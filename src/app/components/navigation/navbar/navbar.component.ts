import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    get isBarras() {
        return this.currentUser && this.currentUser.role === 'Barras';
    }
    get isPie() {
      return this.currentUser && this.currentUser.role === 'Pie';
  }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
