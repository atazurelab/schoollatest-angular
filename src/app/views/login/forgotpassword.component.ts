import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseService } from '../shared/base.service';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'forgotpassword.component.html'
})


export class ForgotPasswordComponent {
  isSuccess: boolean;
  submitted :boolean = false;
  userData : any =  {username: '', Mobile:''};
  errMessage :string;
  constructor(private router: Router,
    private baseService: BaseService,
    private _loggedInUserService: LoggedInUserService,
    private http: HttpClient) { }


    
  gotoLogin(): void {
    this.router.navigate(["/login"]);
  }


  ResetPassword(): void {

 
this.submitted = true ; 

    this.ForgotPwd().subscribe(response => {
      this.isSuccess = true;
      console.log('new response : ', response); 
     // this.router.navigate(["/"]);
     //  this.router.navigate(["/login"]);
    }, err => { 
      this.errMessage =err;     
     ///   alert(err); 
      this.submitted = false ; 
      this.isSuccess = false;
      
    });
  }


  ForgotPwd(): Observable<any> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    var obj = JSON.stringify({ UserName: this.userData.username, Mobile: this.userData.Mobile});

    const url = "https://localhost:44311/api/auth/ForgotPwd";
    var res = this.http.post<any>(url, obj, { headers })
      .pipe(
        // tap(data => console.log('Token: ' + data)),
        catchError(this.baseService.handleError)

      );
    return res;

  }
}

