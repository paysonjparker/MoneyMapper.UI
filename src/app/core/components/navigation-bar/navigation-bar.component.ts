import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { UserResponse } from '../../models/user/user.response';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    AvatarModule
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent implements OnInit {

  menuItems!: MenuItem[];

  endMenuItems!: MenuItem[];

  loggedInUser!: UserResponse;

  constructor(private router: Router) { }

  ngOnInit() {
    // this.loggedInUser = {
    //   id: 1,
    //   username: 'paysonparker',
    //   password: 'password',
    //   fullName: 'Payson Parker',
    //   emailAddress: 'payson.parker@comcast.net'
    // };

    this.menuItems = [
      {
        label: 'Home',
        icon: 'pi pi-home'
      },
    ];
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  navigateToLoginPage() {
    this.router.navigate(['login']);
  }
}
