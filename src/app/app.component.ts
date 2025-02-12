import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { NavigationBarComponent } from './core/components/navigation-bar/navigation-bar.component';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './core/services/authentication/authentication.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    NavigationBarComponent,
  ],
  providers: [
    AuthenticationService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'Money Mapper';

  isUserLoggedIn: boolean = false;

  /**
   * Constructor for App Component.
   * @param primeNgConfig - An injected instance of PrimeNg's {@link PrimeNGConfig}
   */
  constructor(
    private primeNgConfig: PrimeNGConfig,
  ) { }

  /**
   * NgOnInit lifecycle hook. Executes when application is initialized.
   */
  ngOnInit() {
    // Set PrimeNg Input style to 'filled'.
    this.primeNgConfig.inputStyle = signal<"outlined" | "filled">("filled");
  }
}
