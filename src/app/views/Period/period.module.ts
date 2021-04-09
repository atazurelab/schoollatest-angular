
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { NgOrderByPipeModule } from 'angular-pipes';   
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert'; 
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CollapseModule } from 'ngx-bootstrap/collapse'; 
 

import { PeriodCreateComponent } from './period-create.component';
import { PeriodEditComponent } from './period-edit.component';
import { PeriodListComponent } from './period-list.component'; 
import { PeriodRoutingModule } from './period-routing.module';
 
 import { SharedModule } from '../shared/shared.module';  
 import { AuthGuard } from '../guards/auth-guard.service';

@NgModule({
  declarations: [    
    PeriodCreateComponent, 
    PeriodEditComponent,
    PeriodListComponent 
  ],

  imports: [
    CommonModule ,
    PeriodRoutingModule,  
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    CollapseModule.forRoot(),   
    NgOrderByPipeModule,
    SharedModule
  ], 
  providers: [AuthGuard],
})
export class PeriodModule { }
