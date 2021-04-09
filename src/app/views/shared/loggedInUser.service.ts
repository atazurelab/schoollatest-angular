import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { loggedInUser } from './loggedInUser';
import { BaseService } from '../shared/base.service';
import { SelectItem } from '../shared/SelectItem'; 
import { ISchool } from '../school/school';
import { IStudent } from '../student/student';
@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {
  public loggedInUser : loggedInUser;
  private _school : ISchool;
 
  get School(): ISchool {
      return this._school;
  }

  set School(school : ISchool) {      
          this._school = school;       
  }

  public Subjects :  string[];
  public Students :  SelectItem[];
    public Classes :  SelectItem[];
    public Teachers :  SelectItem[];
  public selectedPage: number;
  public IsReload: boolean = false;
  public schoolCode: string = 'S001'; 
  private baseUrl = this.baseService.C_APP_URL + '/UserData';
  public objSearch :any;
  
  constructor(private http: HttpClient, private baseService: BaseService) { }
 
 
  getclasses(): Observable<any> {
    console.log('requesting header');
    const headers = this.baseService.getHeaders();  
    if (!this.IsReload  ) {
      const url = `${this.baseUrl}/GetData?scode=${this.schoolCode}`;
      var res = this.http.post<loggedInUser>(url,  { headers })
        .pipe(
          tap(data =>  { console.log('GetData', data);  }),
          catchError(this.baseService.handleError)
          // tap(data => this.PrevResponse = data), 
        ); 
    
      this.IsReload = true;
    }    
    return res;
  }
  

 
  getSchool(): Observable<ISchool> {
    console.log('requesting header');
    const url  = this.baseService.C_APP_URL + '/School';
    const headers = this.baseService.getHeaders();  
    if (!this.School != null  ) {
    //  const url  = this.baseService.C_APP_URL + '/School';
      const url = `${this.baseService.C_APP_URL}/School/GetById?Id=${this.loggedInUser.SchoolId}`;
      var res = this.http.get<ISchool>(url,  { headers })
        .pipe(
          tap(data =>  { console.log('GetData', data); this.School = data;  }),
          catchError(this.baseService.handleError)
          // tap(data => this.PrevResponse = data), 
        );  
    }    
    return res;
  }
  
  
  getStudentsOld(): Observable<any> {
    console.log('getStudents');
    let token = localStorage.getItem("jwt");    
    console.log('token', token);  
    const headers =   new HttpHeaders ({ 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
      });
    if ( this.Students == null || this.Students.length  == 0 ) {
      const url = `${this.baseUrl}/GetData?scode=${this.schoolCode}`;
      console.log('url', url)
      var res = this.http.post(url,  { headers })
        .pipe(
          tap(data =>  { console.log('GetStudents', data);     }),
          catchError(this.baseService.handleError)
          // tap(data => this.PrevResponse = data), 
        ); 
     console.log('res', res);
     return res;
    }    
   
  }

  private StudentsResponse : any;

  getStudents(): Observable<any> {
   // const headers = this.baseService.getHeaders();
   let token = localStorage.getItem("jwt");    
   console.log('token', token);  
   const myauthheaders =   new HttpHeaders ({ 
     'Content-Type': 'application/json', 
     'Authorization': `Bearer ${token}`
     });
    if (this.StudentsResponse == null ) {
      const url = `${this.baseUrl}/GetData?scode=${this.schoolCode}`;
      console.log('url', url)
      var res = this.http.post(url, { headers : myauthheaders })
        .pipe(
          tap(data =>  { console.log('Students data', data);     }),
          catchError(this.baseService.handleError)
          // tap(data => this.PrevResponse = data),

        );
      
      this.StudentsResponse = res;
       
    }
    else {
      res = this.StudentsResponse;
    }
    return res;

  }
 
}


export enum  Operator
{
    EqualTo,
    NotEqualTo,
    NotEqualToNullable,
    EqualToNullable,
    Contains,
    EndsWith,
    StartWith,
    GreaterThan,
    LessThan,
    GreaterThanEqualTo,
    LessThanEqualTo,
    Between,
    Range
}



   export enum DataType
        {
            Text ,
            TextExact,
            Amount ,
            Int  ,
            Date ,
            bit ,
            CombineOR ,
            CombineAnd ,
            CombineORExact  ,
            CombineAndExact ,
        }








