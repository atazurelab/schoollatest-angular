import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.service';

import { ImportdataComponent } from './importdata.component'; 


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      title: 'Importdata'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        canActivate: [AuthGuard],
        component: ImportdataComponent,      
        data: {
          title: 'List'
        }
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
export class ImportdataRoutingModule { }
