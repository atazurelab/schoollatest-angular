import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ISubscription } from './subscription';
import { BaseService } from '../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private PrevResponse: any;
  public selectedPage: number;
  public IsLoaded: boolean = false;
  private baseUrl = this.baseService.C_APP_URL + '/subscription';
  public objSearch :any;
  
 
  get headers(): HttpHeaders {
    return this.baseService.getHeaders() ;
   }
   
  constructor(private http: HttpClient, private baseService: BaseService) { }


  search(page: number, records: number, lstConditions: any, isReload: boolean): Observable<any> {
    

    if (isReload || this.PrevResponse == null || this.selectedPage != page) {
      const url = `${this.baseUrl}/search?skip=${page}&take=${records}`;
      var res = this.http.post<ISubscription>(url, lstConditions, {  headers : this.headers })
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


  getBySchoolId(id: number): Observable<any> { 
    const url = `${this.baseUrl}/getBySchoolId?Id=${id}`;
    return this.http.get<any>(url,{ headers : this.headers})
      .pipe(
      //  tap(data => console.log('GetById: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }


  create(obj: ISubscription): Observable<ISubscription> {
  
    obj.Id = 0;
    return this.http.post<ISubscription>(this.baseUrl, obj, {  headers : this.headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }

  update(obj: ISubscription): Observable<ISubscription> {
    console.log(obj);
   
    // new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}?id=${obj.Id}`;
    return this.http.put<ISubscription>(url, obj, {  headers : this.headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + obj.Id)),
        // Return the ISubscription on an update
        map(() => obj),
        catchError(this.baseService.handleError)
      );
  }

  delete(id: number): Observable<{}> {
   
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<ISubscription>(url, {  headers : this.headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.baseService.handleError)
      );
  }



  private initialize(): ISubscription {
    // Return an initialized object
    return {
     Id :0,
PlanId :0,
SchoolId :0,
StartDate : new Date(),
EndDate : new Date(),
Status :null,
Description :null, 
	CreatedByCode :null,
	ModifiedByCode : null, 
	RowVersionStr : null,
	CreatedDateTime : new Date(),
	ModifiedDateTime :new Date(),
  SchoolCode: null,
    };
  }


}








