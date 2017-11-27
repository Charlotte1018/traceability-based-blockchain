import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(routes);
