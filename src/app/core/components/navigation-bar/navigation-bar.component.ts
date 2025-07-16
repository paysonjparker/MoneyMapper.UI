import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { UserResponse } from '../../models/user/user.response';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    AvatarModule,
    OverlayPanelModule,
    ButtonModule
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent implements OnInit {

  menuItems!: MenuItem[];

  endMenuItems!: MenuItem[];

  loggedInUser!: UserResponse;

  userIsLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {

    this.authenticationService.userLoggedInObservable.subscribe(value => {
      this.userIsLoggedIn = value;
      this.getLoggedInUserInfo();
    });

    this.getLoggedInUserInfo();

    this.menuItems = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        route: ''
      },
      {
        label: 'Add Budget',
        icon: 'pi pi-shopping-bag',
        route: '/add-budget'
      }
    ];
  }

  getLoggedInUserInfo() {
    if (this.isUserLoggedIn()) {
      this.userService.getUserById(Number(localStorage?.getItem('UserId'))).subscribe({
        next: data => {
          this.loggedInUser = data;
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  navigateToLoginPage() {
    this.router.navigate(['login']);
  }

  isUserLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage && this.authenticationService.isLoggedIn()) {
      return true;
    }
    return false;

  }

  logout() {
    this.authenticationService.logout();
    location.reload();
    this.router.navigate(['login']);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
