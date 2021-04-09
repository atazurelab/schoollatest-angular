
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
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { RequestCreateComponent } from './request-create.component';
import { RequestEditComponent } from './request-edit.component';
import { RequestListComponent } from './request-list.component'; 
import { RequestRoutingModule } from './request-routing.module';
 
 import { SharedModule } from '../shared/shared.module';  
 import { AuthGuard } from '../guards/auth-guard.service';



@NgModule({
  declarations: [    
    RequestCreateComponent, 
    RequestEditComponent,
    RequestListComponent 
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
    NgOrderByPipeModule,
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot(),
	RequestRoutingModule,  
    SharedModule
  ], 
   providers: [AuthGuard],
})
export class RequestModule { }
