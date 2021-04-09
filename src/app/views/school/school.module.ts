
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

import { SchoolCreateComponent } from './school-create.component';
import { SchoolEditComponent } from './school-edit.component';
import { SchoolListComponent } from './school-list.component'; 
import { SchoolRoutingModule } from './school-routing.module';
 
 import { SharedModule } from '../shared/shared.module';  
 import { AuthGuard } from '../guards/auth-guard.service';

@NgModule({
  declarations: [    
    SchoolCreateComponent, 
    SchoolEditComponent,
    SchoolListComponent 
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
	SchoolRoutingModule,  
    SharedModule
  ], 
  providers: [AuthGuard],
})
export class SchoolModule { }
