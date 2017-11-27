import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'

import { AtestComponent } from './atest.component';

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: '', component: AtestComponent
        }])
    ],
    exports: [],
    declarations: [AtestComponent],
    providers: []
})

export class AtestModule { }