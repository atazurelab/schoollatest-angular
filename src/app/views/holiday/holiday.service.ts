import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IHoliday } from './holiday';
import { BaseService } from '../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private PrevResponse: any;
  public selectedPage: number;
  public IsLoaded: boolean = false;
  private baseUrl = this.baseService.C_APP_URL + '/holiday';
  public objSearch :any;
  
 
  get headers(): HttpHeaders {
    return this.baseService.getHeaders() ;
   }
   
  constructor(private http: HttpClient, private baseService: BaseService) { }


  search(page: number, records: number, lstConditions: any, isReload: boolean): Observable<any> {
    

    if (isReload || this.PrevResponse == null || this.selectedPage != page) {
      const url = `${this.baseUrl}/search?skip=${page}&take=${records}`;
      var res = this.http.post<IHoliday>(url, lstConditions, {  headers : this.headers })
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


  getById(id: number): Observable<IHoliday> {
    if (id === 0) {
      return of(this.initialize());
    }
	 
    const url = `${this.baseUrl}/GetById?Id=${id}`;
    return this.http.get<IHoliday>(url,{ headers : this.headers})
      .pipe(
        tap(data => console.log('GetById: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }


  create(obj: IHoliday): Observable<IHoliday> {
  
    obj.Id = 0;
    return this.http.post<IHoliday>(this.baseUrl, obj, {  headers : this.headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }

  update(obj: IHoliday): Observable<IHoliday> {
    console.log(obj);
   
    // new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}?id=${obj.Id}`;
    return this.http.put<IHoliday>(url, obj, {  headers : this.headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + obj.Id)),
        // Return the IHoliday on an update
        map(() => obj),
        catchError(this.baseService.handleError)
      );
  }

  delete(id: number): Observable<{}> {
   
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<IHoliday>(url, {  headers : this.headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.baseService.handleError)
      );
  }



  private initialize(): IHoliday {
    // Return an initialized object
    return {
     Id :0,
Name :null,
StartDate : new Date(),
EndDate : new Date(),
Description :null,
SchoolCode :null,
CreatedByCode :null,
ModifiedByCode : null, 
RowVersionStr : null,
CreatedDateTime : new Date(),
ModifiedDateTime :new Date(),

    };
  }


}








