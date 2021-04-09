
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

import { HolidayCreateComponent } from './holiday-create.component';
import { HolidayEditComponent } from './holiday-edit.component';
import { HolidayListComponent } from './holiday-list.component'; 
import { HolidayRoutingModule } from './holiday-routing.module';
 
 import { SharedModule } from '../shared/shared.module';  
 import { AuthGuard } from '../guards/auth-guard.service';
@NgModule({
  declarations: [    
    HolidayCreateComponent, 
    HolidayEditComponent,
    HolidayListComponent 
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
	HolidayRoutingModule,  
    SharedModule
  ], 
   providers: [AuthGuard],
})
export class HolidayModule { }
