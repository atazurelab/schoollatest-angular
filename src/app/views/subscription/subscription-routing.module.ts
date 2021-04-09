import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.service';

import { SubscriptionListComponent } from './subscription-list.component';
import { SubscriptionViewComponent } from './subscription-view.component';
import { SubscriptionEditComponent } from './subscription-edit.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      title: 'Subscriptions'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        canActivate: [AuthGuard],
        component: SubscriptionListComponent,      
        data: {
          title: 'List'
        }
      },
      {
        path: 'view',
        canActivate: [AuthGuard],
        component: SubscriptionViewComponent,
        data: {
          title: 'View'
        }
      },
       {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: SubscriptionEditComponent 
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
export class SubscriptionRoutingModule { }
