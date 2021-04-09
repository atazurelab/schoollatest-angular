import { NgModule } from '@angular/core';
import { Routes,ActivatedRouteSnapshot, RouterModule } from '@angular/router';
//import { CanActivate, Router, RouterStateSnapshot ,ActivatedRoute } from '@angular/router';
// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { ForgotPasswordComponent } from './views/login/forgotpassword.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './views/guards/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
{
    path: 'forgot',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot Password'
    }
  },
  
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
  
      {
        path: 'staffs',
        loadChildren: () => import('./views/staff/staff.module').then(m => m.StaffModule)
      },
      {
        path: 'dcu',
        loadChildren: () => import('./views/dailyClassUpdate/dailyClassUpdate.module').then(m => m.DailyClassUpdateModule)
      },
      {
        path: 'periods',
        loadChildren: () => import('./views/period/period.module').then(m => m.PeriodModule)
      },
      {
        path: 'classDetails',
        loadChildren: () => import('./views/classDetail/classDetail.module').then(m => m.ClassDetailModule)
      },
      {
        path: 'schools',
        loadChildren: () => import('./views/school/school.module').then(m => m.SchoolModule)
      },
      {
        path: 'students', 
        loadChildren: () => import('./views/student/student.module').then(m => m.StudentModule)
      },
      {
        path: 'plans',
        loadChildren: () => import('./views/plan/plan.module').then(m => m.PlanModule)
      },
      {
        path: 'subscriptions',
        loadChildren: () => import('./views/subscription/subscription.module').then(m => m.SubscriptionModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'requests',
        loadChildren: () => import('./views/request/request.module').then(m => m.RequestModule)
      },
      {
        path: 'holidays',
        loadChildren: () => import('./views/holiday/holiday.module').then(m => m.HolidayModule)
      },
      {
        path: 'feeDetails',
        loadChildren: () => import('./views/feeDetail/feeDetail.module').then(m => m.FeeDetailModule)
      },
      {
        path: 'noticeBoards',
        loadChildren: () => import('./views/noticeBoard/noticeBoard.module').then(m => m.NoticeBoardModule)
      },
      {
        path: 'timetables',
        loadChildren: () => import('./views/timetable/timetable.module').then(m => m.TimetableModule)
      },
      {
        path: 'Importdata',
        loadChildren: () => import('./views/Importdata/Importdata.module').then(m => m.ImportdataModule)
      },
      {
        path: 'dashboard',
        canActivate :  [AuthGuard],
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
