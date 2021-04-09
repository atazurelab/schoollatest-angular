
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

import { StaffCreateComponent } from './staff-create.component';
import { StaffEditComponent } from './staff-edit.component';
import { StaffListComponent } from './staff-list.component';
import { StaffRoutingModule } from './staff-routing.module';

import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../guards/auth-guard.service';

@NgModule({
  declarations: [
    StaffCreateComponent,
    StaffEditComponent,
    StaffListComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgOrderByPipeModule,
    StaffRoutingModule,
    SharedModule
  ],
  providers: [AuthGuard],
})
export class StaffModule { }
