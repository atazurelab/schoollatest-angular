
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
 

import { TimetableCreateComponent } from './timetable-create.component';
import { TimetableEditComponent } from './timetable-edit.component';
import { TimetableListComponent } from './timetable-list.component'; 
import { TimetableRoutingModule } from './timetable-routing.module';
 
 import { SharedModule } from '../shared/shared.module';  
 import { AuthGuard } from '../guards/auth-guard.service';
@NgModule({
  declarations: [    
    TimetableCreateComponent, 
    TimetableEditComponent,
    TimetableListComponent 
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
	TimetableRoutingModule,  
    SharedModule
  ], 
   providers: [AuthGuard],
})
export class TimetableModule { }
