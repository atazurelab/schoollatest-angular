
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';


import { NgOrderByPipeModule } from 'angular-pipes';   
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert'; 
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CollapseModule } from 'ngx-bootstrap/collapse'; 
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { StudentCreateComponent } from './student-create.component';
import { StudentEditComponent } from './student-edit.component';
import { StudentListComponent } from './student-list.component'; 
import { StudentRoutingModule } from './student-routing.module';
 
 import { SharedModule } from '../shared/shared.module';  
 import { AuthGuard } from '../guards/auth-guard.service';
@NgModule({
  declarations: [    
    StudentCreateComponent, 
    StudentEditComponent,
    StudentListComponent 
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
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgOrderByPipeModule,
	StudentRoutingModule,  
    SharedModule
  ], 
   providers: [AuthGuard],
})
export class StudentModule { }
