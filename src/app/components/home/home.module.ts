import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        NgZorroAntdModule,
        RouterModule.forChild([
            {
                path: '', component: HomeComponent
            }
        ])
    ],
})
export class HomeModule { }