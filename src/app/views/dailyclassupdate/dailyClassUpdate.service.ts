import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IDailyClassUpdate } from './dailyClassUpdate';
import { BaseService } from '../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class DailyClassUpdateService {
  private PrevResponse: any;
  public selectedPage: number;
  public IsLoaded: boolean = false;
  private baseUrl = this.baseService.C_APP_URL + '/DailyClassUpdate';
  private _headers: HttpHeaders;
  public objSearch :any;
 
  get headers(): HttpHeaders {
    return this.baseService.getHeaders() ;
   }
   
  constructor(private http: HttpClient, private baseService: BaseService) { }


  search(page: number, records: number, lstConditions: any, isReload: boolean): Observable<any> {
    

    if (isReload || this.PrevResponse == null || this.selectedPage != page) {
      const url = `${this.baseUrl}/search?skip=${page}&take=${records}`;
      var res = this.http.post<IDailyClassUpdate>(url, lstConditions, {  headers : this.headers })
        .pipe(
          // tap(data => console.log('All: ' + JSON.stringify(data.Records))),
          catchError(this.baseService.handleError)
          // tap(data => this.PrevResponse = data),

        );
      this.selectedPage = page;
      this.PrevResponse = res;
      this.IsLoaded = true;
    }
    else {
      res = this.PrevResponse;
    }
    return res;

  }


  GetDCUByClass(classCode : string,  schoolCode:string,  updateForDate:Date): Observable<any> {
        
      const url = `${this.baseUrl}/GetDCUByClass?ClassCode=${classCode}&SchoolCode=${schoolCode}&UpdateForDate=${updateForDate}`;
      var res = this.http.post<IDailyClassUpdate>(url, null, {  headers : this.headers })
        .pipe(
          // tap(data => console.log('All: ' + JSON.stringify(data.Records))),
          catchError(this.baseService.handleError)
          // tap(data => this.PrevResponse = data),

        );     
    
    return res; 

  }

  getById(id: number): Observable<IDailyClassUpdate> {
    if (id === 0) {
      return of(this.initialize());
    }
	 
    const url = `${this.baseUrl}/GetById?Id=${id}`;
    return this.http.get<IDailyClassUpdate>(url,{ headers : this.headers})
      .pipe(
        tap(data => console.log('GetById: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }


  updateDCU(lst: IDailyClassUpdate[] ): Observable<IDailyClassUpdate> { 
    const url = `${this.baseUrl}/UpdateDCU?`;
    return this.http.post<IDailyClassUpdate>(url, lst, {  headers : this.headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }



  create(obj: IDailyClassUpdate): Observable<IDailyClassUpdate> {
  
    obj.Id = 0;
    return this.http.post<IDailyClassUpdate>(this.baseUrl, obj, {  headers : this.headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }

  update(obj: IDailyClassUpdate): Observable<IDailyClassUpdate> {
    console.log(obj);
   
    // new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}?id=${obj.Id}`;
    return this.http.put<IDailyClassUpdate>(url, obj, {  headers : this.headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + obj.Id)),
        // Return the IDailyClassUpdate on an update
        map(() => obj),
        catchError(this.baseService.handleError)
      );
  }

  delete(id: number): Observable<{}> {
   
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<IDailyClassUpdate>(url, {  headers : this.headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.baseService.handleError)
      );
  }



  private initialize(): IDailyClassUpdate {
    // Return an initialized object
    return {
     Id :0,
ClassCode :null,
SchoolCode :null,
ClassWork :null,
HomeWork :null,
UpdateForDate : new Date(),
Period :null,
Subject :null,
Teacher :null,
SchoolId :0,
ClassId :0 
    };
  }


}








