
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
 

import { ClassDetailCreateComponent } from './classDetail-create.component';
import { ClassDetailEditComponent } from './classDetail-edit.component';
import { ClassDetailListComponent } from './classDetail-list.component'; 
import { ClassDetailRoutingModule } from './classDetail-routing.module';
 
 import { SharedModule } from '../shared/shared.module';  
 import { AuthGuard } from '../guards/auth-guard.service';

@NgModule({
  declarations: [    
    ClassDetailCreateComponent, 
    ClassDetailEditComponent,
    ClassDetailListComponent 
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
	ClassDetailRoutingModule,  
    SharedModule
  ], 
  providers: [AuthGuard],
})
export class ClassDetailModule { }
