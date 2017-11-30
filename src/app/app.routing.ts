import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

/*
*user
*/

import { UserComponent } from './user/user.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

/*
*admin
*/

import { AdminComponent } from './admin/admin.component';
import { SupplyComponent } from './admin/supply/supply.component';

//supply
import { RegisterBasicInfoComponent, SellComponent, StoreComponent, AuditComponent ,
  sellStoreComponent,} from './admin/supply';



import { SaleComponent } from './admin/sale/sale.component';
import { StorageComponent } from './admin/storage/storage.component';

//common
import { RegisterComponent } from './components/register/register.component';

/*
*routes
*/

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'register',
        component: UserRegisterComponent
      },
      {
        path: 'login',
        component: UserLoginComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'supply',
        component: SupplyComponent,
        children: [
          {
            path: 'audit',
            component: AuditComponent
          },
          {
            path: 'RegisterBasicInfo',
            component: RegisterBasicInfoComponent
          },
          {
            path: 'register',
            component: RegisterComponent
          },
          {
            path: 'sell',
            component: SellComponent
          },
          {
            path: 'store',
            component: StoreComponent
          },
          {
            path: 'search',
            component: sellStoreComponent
          },
        ]
      },
      {
        path: 'sale',
        component: SaleComponent
      },
      {
        path: 'storage',
        component: StorageComponent
      },
      {
        path: '',
        redirectTo: 'admin/supply',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'admin/supply',
    pathMatch: 'full'
  },
  // {
  //   path: '**',
  //   redirectTo: 'user/login',
  //   pathMatch: 'full'
  // },
];

export const routing = RouterModule.forRoot(routes);
