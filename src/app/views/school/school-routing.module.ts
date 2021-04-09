import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.service';
import { SchoolListComponent } from './school-list.component';
import { SchoolCreateComponent } from './school-create.component';
import { SchoolEditComponent } from './school-edit.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      title: 'Schools'
    },
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        redirectTo: 'view'
      },


      {
        path: 'list',
        canActivate: [AuthGuard],
        component: SchoolListComponent,
        data: {
          title: 'List'
        }
      },
      {
        path: 'create',
        canActivate: [AuthGuard],
        component: SchoolCreateComponent,
        data: {
          title: 'Create'
        }
      },
       {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: SchoolEditComponent 
      },
      {
        path: 'view',
        canActivate: [AuthGuard],
        component: SchoolEditComponent 
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
export class SchoolRoutingModule { }
