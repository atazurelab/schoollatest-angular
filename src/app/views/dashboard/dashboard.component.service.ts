import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'; 
import { BaseService } from '../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private PrevResponse: any;
  public selectedPage: number;
  public IsLoaded: boolean = false;
  private baseUrl = this.baseService.C_APP_URL + '/UserData';
  private _headers: HttpHeaders;
  public objSearch :any;
 
  get headers(): HttpHeaders {
    return this.baseService.getHeaders() ;
   }
   
  constructor(private http: HttpClient, private baseService: BaseService) { }


  getDashboardData(): Observable<any> {

    if ( this.PrevResponse == null  ) {
      const url = `${this.baseUrl}/GetDashboardData`;
      var res = this.http.post<any>(url, null, {  headers : this.headers })
        .pipe(
          // tap(data => console.log('All: ' + JSON.stringify(data.Records))),
          catchError(this.baseService.handleError)
          // tap(data => this.PrevResponse = data),
        );
     
      this.PrevResponse = res;
      this.IsLoaded = true;
    }
    else {
      res = this.PrevResponse;
    }
    return res;

  }


  publishData(entityName): Observable<any> { 
     
      const url = `${this.baseUrl}/PublishData?entityName=${entityName}`;
      var res = this.http.post<any>(url, null, {  headers : this.headers })
        .pipe(
          // tap(data => console.log('All: ' + JSON.stringify(data.Records))),
          catchError(this.baseService.handleError)
          // tap(data => this.PrevResponse = data),
        ); 
      
    return res;

  } 
 
  }