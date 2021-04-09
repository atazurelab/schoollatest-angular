
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
 

import { NoticeBoardCreateComponent } from './noticeBoard-create.component';
import { NoticeBoardEditComponent } from './noticeBoard-edit.component';
import { NoticeBoardListComponent } from './noticeBoard-list.component'; 
import { NoticeBoardRoutingModule } from './noticeBoard-routing.module';
 
 import { SharedModule } from '../shared/shared.module';  
 import { AuthGuard } from '../guards/auth-guard.service';
@NgModule({
  declarations: [    
    NoticeBoardCreateComponent, 
    NoticeBoardEditComponent,
    NoticeBoardListComponent 
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
	NoticeBoardRoutingModule,  
    SharedModule
  ], 
   providers: [AuthGuard],
})
export class NoticeBoardModule { }
