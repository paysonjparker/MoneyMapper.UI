import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { RegisterComponent } from './core/components/register/register.component';

export const routes: Routes = [
    {
        title: 'Budget',
        path: '',
        component: HomeComponent
    },
    {
        title: 'Login',
        path: 'login',
        component: LoginComponent
    },
    {
        title: 'Sign Up',
        path: 'register',
        component: RegisterComponent
    }
];
