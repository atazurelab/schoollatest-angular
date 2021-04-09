import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.service';

import { FeeDetailListComponent } from './feeDetail-list.component';
import { FeeDetailCreateComponent } from './feeDetail-create.component';
import { FeeDetailEditComponent } from './feeDetail-edit.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      title: 'FeeDetails'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        canActivate: [AuthGuard],
        component: FeeDetailListComponent,      
        data: {
          title: 'List'
        }
      },
      {
        path: 'create',
        canActivate: [AuthGuard],
        component: FeeDetailCreateComponent,
        data: {
          title: 'Create'
        }
      },
       {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: FeeDetailEditComponent 
      }
    ]
  }
];

  
@NgModule({
  declarations: [],
  imports: [
      RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FeeDetailRoutingModule { }
