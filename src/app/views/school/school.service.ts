import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ISchool } from './school';
import { BaseService } from '../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private PrevResponse: any;
  public selectedPage: number;
  public IsLoaded: boolean = false;
  private baseUrl = this.baseService.C_APP_URL + '/school';
  public objSearch :any;
  
  constructor(private http: HttpClient, private baseService: BaseService) { }


  search(page: number, records: number, lstConditions: any, isReload: boolean): Observable<any> {
    const headers = this.baseService.getHeaders();

    if (isReload || this.PrevResponse == null || this.selectedPage != page) {
      const url = `${this.baseUrl}/search?skip=${page}&take=${records}`;
      var res = this.http.post<ISchool>(url, lstConditions, { headers })
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


  getById(id: number): Observable<ISchool> {
    if (id === 0) {
      return of(this.initialize());
    }
    const headers = this.baseService.getHeaders();
    const url = `${this.baseUrl}/GetById?Id=${id}`;
    return this.http.get<ISchool>(url,{ headers })
      .pipe(
        tap(data => console.log('GetById: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }


  create(obj: ISchool): Observable<ISchool> {
    const headers = this.baseService.getHeaders();
    obj.Id = 0;
    return this.http.post<ISchool>(this.baseUrl, obj, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }

  update(obj: ISchool): Observable<ISchool> {
    console.log(obj);
    const headers = this.baseService.getHeaders(); 
    // new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}?id=${obj.Id}`;
    return this.http.put<ISchool>(url, obj, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + obj.Id)),
        // Return the ISchool on an update
        map(() => obj),
        catchError(this.baseService.handleError)
      );
  }

  delete(id: number): Observable<{}> {
    const headers = this.baseService.getHeaders();
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<ISchool>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.baseService.handleError)
      );
  }



  private initialize(): ISchool {
    // Return an initialized object
    return {
     Id :0,
Name :null,
ShortName :null,
Code :null,
RegisteredDate : new Date(),
EmailID :null,
Mobile :null,
Board :null,
Address :null,
City :null,
State :null,
PIN :null,
IsDeleted :false,
ContactPerson :null,
ContactNo :null,
CreatedByCode :null,
    ModifiedByCode : null, 
    RowVersionStr : null,
    CreatedDateTime : new Date(),
    ModifiedDateTime :new Date(),

    };
  }


}








