import { Component, OnInit } from '@angular/core';
import { BudgetComponent } from '../budget-components/budget/budget.component';
import { ButtonModule } from 'primeng/button';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    BudgetComponent,
    ButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  isUserLoggedIn: boolean = false;

  /**
   *
   */
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authenticationService.changeLoggedInStatus(true);
    this.isUserLoggedIn = this.checkIfUserIsLoggedIn();
  }

  checkIfUserIsLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
