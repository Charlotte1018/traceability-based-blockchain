import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
//Component
import { AppComponent } from './app.component';
import {HomeComponent} from './components/home/home.component';
//user
import {UserComponent} from './user/user.component';
import {UserLoginComponent} from './user/user-login/user-login.component';
import {UserRegisterComponent} from './user/user-register/user-register.component';
//admin
import {AdminComponent} from './admin/admin.component';
import {SupplyComponent} from './admin/supply/supply.component';
import {SaleComponent} from './admin/sale/sale.component';
import {StorageComponent} from './admin/storage/storage.component';
//common
import {RegisterComponent} from './components/register/register.component';


import { ApiService } from './shared';
import { routing } from './app.routing';
//Service
import { HttpService,Web3Service }             from './service';
import { UserService } from './_services';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
// ng-zorro-antd UI
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    NgZorroAntdModule.forRoot(),
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    //user
    UserComponent,
    UserLoginComponent,
    UserRegisterComponent,
    
    //admin
    AdminComponent,
    SupplyComponent,
    SaleComponent,
    StorageComponent,
    //common
    RegisterComponent,
    ],
  providers: [
    ApiService,
    HttpService,
    Web3Service,
    UserService,
    FormBuilder,
    Validators
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(public appRef: ApplicationRef) {}
  // hmrOnInit(store) {
  //   console.log('HMR store', store);
  // }
  // hmrOnDestroy(store) {
  //   let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
  //   // recreate elements
  //   store.disposeOldHosts = createNewHosts(cmpLocation);
  //   // remove styles
  //   removeNgStyles();
  // }
  // hmrAfterDestroy(store) {
  //   // display new elements
  //   store.disposeOldHosts();
  //   delete store.disposeOldHosts;
  // }
}
