import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../guards/auth-guard.service';
import { PeriodListComponent } from './period-list.component';
import { PeriodCreateComponent } from './period-create.component';
import { PeriodEditComponent } from './period-edit.component';


const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: '',
    data: {
      title: 'Periods'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        canActivate: [AuthGuard],
        component: PeriodListComponent,
        data: {
          title: 'List'
        }
      },
      {
        path: 'create',
        canActivate: [AuthGuard],
        component: PeriodCreateComponent,
        data: {
          title: 'Create'
        }
      },
       {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: PeriodEditComponent 
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
export class PeriodRoutingModule { }
