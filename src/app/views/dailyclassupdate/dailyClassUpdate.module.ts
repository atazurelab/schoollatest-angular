
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
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { DailyClassUpdateCreateComponent } from './dailyClassUpdate-create.component';
import { DailyClassUpdateEditComponent } from './dailyClassUpdate-edit.component';
import { DailyClassUpdateListComponent } from './dailyClassUpdate-list.component'; 
import { DailyClassUpdateRoutingModule } from './dailyClassUpdate-routing.module';
 
 import { SharedModule } from '../shared/shared.module';  
 import { AuthGuard } from '../guards/auth-guard.service';
@NgModule({
  declarations: [    
    DailyClassUpdateCreateComponent, 
    DailyClassUpdateEditComponent,
    DailyClassUpdateListComponent 
  ],

  imports: [
    CommonModule ,    
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    CollapseModule.forRoot(),  
	BsDatepickerModule.forRoot(),  	
    NgOrderByPipeModule,
	
	DailyClassUpdateRoutingModule,  
    SharedModule
  ], 
   providers: [AuthGuard],
})
export class DailyClassUpdateModule { }
