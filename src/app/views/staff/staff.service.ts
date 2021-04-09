import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IStaff } from './staff';
import { BaseService } from '../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private PrevResponse: any;
  public selectedPage: number;
  public IsLoaded: boolean = false;
  private baseUrl = this.baseService.C_APP_URL + '/staff';
  public objSearch :any;
  constructor(private http: HttpClient, private baseService: BaseService) { }


  search(page: number, records: number, lstConditions: any, isReload: boolean): Observable<any> {
    const headers = this.baseService.getHeaders();

    if (isReload || this.PrevResponse == null || this.selectedPage != page) {
      const url = `${this.baseUrl}/search?skip=${page}&take=${records}`;
      var res = this.http.post<IStaff>(url, lstConditions, { headers })
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


  getById(id: number): Observable<IStaff> {
    if (id === 0) {
      return of(this.initialize());
    }
    const headers = this.baseService.getHeaders();
    const url = `${this.baseUrl}/GetById?Id=${id}`;
    return this.http.get<IStaff>(url,{ headers })
      .pipe(
      //  tap(data => console.log('GetById: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }

  UpdateStaffLogin(obj: IStaff): Observable<IStaff> {
    const headers = this.baseService.getHeaders();
    obj.Id = 0;
    return this.http.post<IStaff>(this.baseUrl + '/UpdateStaffLogin', obj, { headers })
      .pipe(
        //tap(data => console.log('UpdateStaffLogin: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }


  create(obj: IStaff): Observable<IStaff> {
    const headers = this.baseService.getHeaders();
    obj.Id = 0;
    return this.http.post<IStaff>(this.baseUrl, obj, { headers })
      .pipe(
      //  tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }

  update(obj: IStaff): Observable<IStaff> {
    console.log(obj);
    const headers = this.baseService.getHeaders(); 
    // new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}?id=${obj.Id}`;
    return this.http.put<IStaff>(url, obj, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + obj.Id)),
        // Return the IStaff on an update
        map(() => obj),
        catchError(this.baseService.handleError)
      );
  }

  delete(id: number): Observable<{}> {
    const headers = this.baseService.getHeaders();
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<IStaff>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.baseService.handleError)
      );
  }

  private initialize(): IStaff    {
    // Return an initialized object
    return {
          Id :0,
          Salutation :null,
          Name :null,
          Code :null,
          DateOfBirth : new Date(),
          SchoolCode :null,
          Gender :null,
          EmailID :null,
          Mobile :null,
          IsDeleted :false,
          IsTeacher :false,
          IsAdmin :false,
          CreatedByCode :null,
    ModifiedByCode : null, 
    RowVersionStr : null,
    CreatedDateTime : new Date(),
    ModifiedDateTime :new Date(),

    };
  }


}








