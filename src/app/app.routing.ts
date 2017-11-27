import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import {UserComponent} from './user/user.component';
import {UserLoginComponent} from './user/user-login/user-login.component';
import {UserRegisterComponent} from './user/user-register/user-register.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent,
    children:[
      {
        path:'register',
        component:UserRegisterComponent
      },
      {
        path:'login',
        component:UserLoginComponent
      },
      {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
      }
    ]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

export const routing = RouterModule.forRoot(routes);
