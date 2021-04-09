import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseService } from '../shared/base.service';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})


export class LoginComponent {
  invalidLogin: boolean;
  submitted :boolean = false;
loginData : any =  {username: 'akt@gmail.com', pwd:'Pass@123'};

  constructor(private router: Router,
    private activatedRoute : ActivatedRoute,
    private baseService: BaseService,
    private _loggedInUserService: LoggedInUserService,
    private http: HttpClient) { }

    returnUrl : any;

    ngOnInit(){
      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/'; 
    }
    

  authenticate(): Observable<any> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    var obj = JSON.stringify({ UserName: this.loginData.username, Password: this.loginData.pwd});

    const url = "https://localhost:44311/api/auth/login";
    var res = this.http.post<any>(url, obj, { headers })
      .pipe(
        // tap(data => console.log('Token: ' + data)),
        catchError(this.baseService.handleError)

      );
    return res;

  }

  forgot(): void {
    this.router.navigate(["/forgot"]);
  }

  login(): void {

console.log(this.loginData);
this.submitted = true ;

    this.authenticate().subscribe(response => {
      const token = response.Token;
      console.log('new response : ', response);

      const refreshToken = (<any>response).RefreshToken;
      const loggedInUser = response.loggedInUser;
      const Students = response.Students;
      const Classes = response.Classes;
      const Teachers = response.Teachers;
      const Subjects = response.Subjects;
      localStorage.setItem("jwt", token);
      localStorage.setItem("refreshToken", refreshToken);
      this.invalidLogin = false; 
      this._loggedInUserService.loggedInUser = loggedInUser;
      this._loggedInUserService.Students = Students;
      this._loggedInUserService.Classes = Classes;
      this._loggedInUserService.Teachers = Teachers;
            this._loggedInUserService.Subjects = Subjects;
      this.router.navigateByUrl(this.returnUrl);
     // this.router.navigate([this.returnUrl]);

      // this.router.navigate(["/staff"]);
    }, err => {
      
        alert(err); 
      this.submitted = false ; 
      this.invalidLogin = true;
      
    });
  }
}

