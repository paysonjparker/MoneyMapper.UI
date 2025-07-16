import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { RegisterComponent } from './core/components/register/register.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { AddBudgetComponent } from './core/components/budget-components/add-budget/add-budget.component';
import { GoogleAuthGuard } from './core/guards/google-auth/google-auth.guard';
import { GoogleLoginComponent } from './core/components/google-login/google-login.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'budget',
    },
    {
        title: 'Budget',
        path: 'budget',
        component: HomeComponent,
        canActivate: [GoogleAuthGuard]
    },
    {
        title: 'Add Budget',
        path: 'add-budget',
        component: AddBudgetComponent,
        canActivate: [GoogleAuthGuard]
    },
    {
        title: 'Sign Up',
        path: 'register',
        component: RegisterComponent,
        canActivate: [GoogleAuthGuard]
    },
    {
        title: 'Login',
        path: 'login',
        component: LoginComponent
    },
    {
        title: 'Google Login',
        path: 'google-login',
        component: GoogleLoginComponent
    }
];
