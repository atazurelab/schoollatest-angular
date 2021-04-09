import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IPeriod } from './period';
import { BaseService } from '../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  private PrevResponse: any;
  public selectedPage: number;
  public IsLoaded: boolean = false;
  private baseUrl = this.baseService.C_APP_URL + '/period';
  public objSearch :any;
  
  constructor(private http: HttpClient, private baseService: BaseService) { }


  search(page: number, records: number, lstConditions: any, isReload: boolean): Observable<any> {
    const headers = this.baseService.getHeaders();

    if (isReload || this.PrevResponse == null || this.selectedPage != page) {
      const url = `${this.baseUrl}/search?skip=${page}&take=${records}`;
      var res = this.http.post<IPeriod>(url, lstConditions, { headers })
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


  getById(id: number): Observable<IPeriod> {
    if (id === 0) {
      return of(this.initialize());
    }
    const headers = this.baseService.getHeaders();
    const url = `${this.baseUrl}/GetById?Id=${id}`;
    return this.http.get<IPeriod>(url,{headers})
      .pipe(
        tap(data => console.log('GetById: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }


  create(obj: IPeriod): Observable<IPeriod> {
    const headers = this.baseService.getHeaders();
    obj.Id = 0;
    return this.http.post<IPeriod>(this.baseUrl, obj, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }

  update(obj: IPeriod): Observable<IPeriod> {
    console.log(obj);
    const headers = this.baseService.getHeaders(); 
    // new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}?id=${obj.Id}`;
    return this.http.put<IPeriod>(url, obj, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + obj.Id)),
        // Return the IPeriod on an update
        map(() => obj),
        catchError(this.baseService.handleError)
      );
  }

  delete(id: number): Observable<{}> {
    const headers = this.baseService.getHeaders();
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<IPeriod>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.baseService.handleError)
      );
  }



  private initialize(): IPeriod {
    // Return an initialized object
    return {
      Id: 0,
      Name: null,
      ClassCode: null,
      SchoolCode: null,
      Description: null,
      CreatedByCode :null,
      ModifiedByCode : null, 
      RowVersionStr : null,
      CreatedDateTime : new Date(),
      ModifiedDateTime :new Date(),
    };
  }


}




