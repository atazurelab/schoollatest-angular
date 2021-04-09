import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.service';

import { DailyClassUpdateListComponent } from './dailyClassUpdate-list.component';
import { DailyClassUpdateCreateComponent } from './dailyClassUpdate-create.component';
import { DailyClassUpdateEditComponent } from './dailyClassUpdate-edit.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      title: 'DailyClassUpdates'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        canActivate: [AuthGuard],
        component: DailyClassUpdateListComponent,      
        data: {
          title: 'List'
        }
      },
      {
        path: 'create',
        canActivate: [AuthGuard],
        component: DailyClassUpdateCreateComponent,
        data: {
          title: 'Create'
        }
      },
       {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: DailyClassUpdateEditComponent 
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
export class DailyClassUpdateRoutingModule { }
