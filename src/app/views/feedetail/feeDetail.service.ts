import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IFeeDetail } from './feeDetail';
import { BaseService } from '../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class FeeDetailService {
  private PrevResponse: any;
  public selectedPage: number;
  public IsLoaded: boolean = false;
  private baseUrl = this.baseService.C_APP_URL + '/feeDetail';
  public objSearch :any;


  get headers(): HttpHeaders {
    return this.baseService.getHeaders();
  }

  constructor(private http: HttpClient, private baseService: BaseService) { }


  search(page: number, records: number, lstConditions: any, isReload: boolean): Observable<any> {


    if (isReload || this.PrevResponse == null || this.selectedPage != page) {
      const url = `${this.baseUrl}/search?skip=${page}&take=${records}`;
      var res = this.http.post<any[]>(url, lstConditions, { headers: this.headers })
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


  getById(id: number): Observable<IFeeDetail> {
    if (id === 0) {
      return of(this.initialize());
    }

    const url = `${this.baseUrl}/GetById?Id=${id}`;
    return this.http.get<IFeeDetail>(url, { headers: this.headers })
      .pipe(
        tap(data => console.log('GetById: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }


  create(obj: IFeeDetail): Observable<IFeeDetail> {

    obj.Id = 0;
    return this.http.post<IFeeDetail>(this.baseUrl, obj, { headers: this.headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }

  update(obj: IFeeDetail): Observable<IFeeDetail> {
    console.log(obj);

    // new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}?id=${obj.Id}`;
    return this.http.put<IFeeDetail>(url, obj, { headers: this.headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + obj.Id)),
        // Return the IFeeDetail on an update
        map(() => obj),
        catchError(this.baseService.handleError)
      );
  }

  delete(id: number): Observable<{}> {

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<IFeeDetail>(url, { headers: this.headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.baseService.handleError)
      );
  }



  private initialize(): IFeeDetail {
    // Return an initialized object
    return {
      Id: 0,
      Amount: 0,
      DueDate: new Date(),
      Status: null,
      StudentCode: null,
      SchoolCode: null,
      Description: null,
      ReferenceNo: null,
      StudentId: 0,
      CreatedByCode: null,
      ModifiedByCode: null,
      RowVersionStr: null,
      CreatedDateTime: new Date(),
      ModifiedDateTime: new Date(),

    };
  }


}








