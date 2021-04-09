import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IStudent } from './student';
import { BaseService } from '../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private PrevResponse: any;
  public selectedPage: number;
  public IsLoaded: boolean = false;
  private baseUrl = this.baseService.C_APP_URL + '/student'; 
  public objSearch :any;
 
  get headers(): HttpHeaders {
    console.log('headers valies in StudentService');
    return this.baseService.getHeaders() ;
   }
   




  constructor(private http: HttpClient, private baseService: BaseService) 
  { console.log('StudentService created'); }


  search(page: number, records: number, lstConditions: any, isReload: boolean): Observable<any> {
    

    if (isReload || this.PrevResponse == null || this.selectedPage != page) {
      const url = `${this.baseUrl}/search?skip=${page}&take=${records}`;
      var res = this.http.post<IStudent>(url, lstConditions, {  headers : this.headers })
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


  getById(id: number): Observable<IStudent> {
    if (id === 0) {
      return of(this.initialize());
    }
	 
    const url = `${this.baseUrl}/GetById?Id=${id}`;
    return this.http.get<IStudent>(url,{ headers : this.headers})
      .pipe(
        tap(data => console.log('GetById: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }


  create(obj: IStudent): Observable<IStudent> {
  
    obj.Id = 0;
    return this.http.post<IStudent>(this.baseUrl, obj, {  headers : this.headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }

  update(obj: IStudent): Observable<IStudent> {
    console.log(obj);
   
    // new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}?id=${obj.Id}`;
    return this.http.put<IStudent>(url, obj, {  headers : this.headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + obj.Id)),
        // Return the IStudent on an update
        map(() => obj),
        catchError(this.baseService.handleError)
      );
  }

  delete(id: number): Observable<{}> {
   
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<IStudent>(url, {  headers : this.headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.baseService.handleError)
      );
  }



  private initialize(): IStudent {
    // Return an initialized object
    return {
     Id :0,
Name :null,
Code :null,
DateOfBirth : new Date(),
EmailId :null,
Mobile :null,
Gender :null,
ClassCode :null,
SchoolCode :null,
Address :null,
IsDeleted :false,
Description :null,
CreatedByCode :null,
    ModifiedByCode : null, 
    RowVersionStr : null,
    CreatedDateTime : new Date(),
    ModifiedDateTime :new Date(),

    };
  }


}








