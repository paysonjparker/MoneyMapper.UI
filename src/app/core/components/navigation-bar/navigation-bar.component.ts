import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { User } from '../../models/user/user.response';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    MenubarModule,
    AvatarModule
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent implements OnInit {

  menuItems!: MenuItem[]

  loggedInUser!: User;

  ngOnInit() {
    this.loggedInUser = {
      id: 1,
      username: 'paysonparker',
      password: 'password',
      fullName: 'Payson Parker',
      emailAddress: 'payson.parker@comcast.net'
    };

    this.menuItems = [
      {
        label: 'Home',
        icon: 'pi pi-home'
      },
    ];
  }
}
