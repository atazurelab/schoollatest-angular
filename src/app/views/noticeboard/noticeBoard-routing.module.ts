import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.service';

import { NoticeBoardListComponent } from './noticeBoard-list.component';
import { NoticeBoardCreateComponent } from './noticeBoard-create.component';
import { NoticeBoardEditComponent } from './noticeBoard-edit.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      title: 'NoticeBoards'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        canActivate: [AuthGuard],
        component: NoticeBoardListComponent,      
        data: {
          title: 'List'
        }
      },
      {
        path: 'create',
        canActivate: [AuthGuard],
        component: NoticeBoardCreateComponent,
        data: {
          title: 'Create'
        }
      },
       {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: NoticeBoardEditComponent 
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
export class NoticeBoardRoutingModule { }
