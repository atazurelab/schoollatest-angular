import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ITimetable } from './timetable';
import { BaseService } from '../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  private PrevResponse: any;
  public selectedPage: number;
  public IsLoaded: boolean = false;
  private baseUrl = this.baseService.C_APP_URL + '/timetable';
  public objSearch :any;


  get headers(): HttpHeaders {
    return this.baseService.getHeaders();
  }

  constructor(private http: HttpClient, private baseService: BaseService) { }


  search(page: number, records: number, lstConditions: any, isReload: boolean): Observable<any> {


    if (isReload || this.PrevResponse == null || this.selectedPage != page) {
      const url = `${this.baseUrl}/search?skip=${page}&take=${records}`;
      var res = this.http.post<ITimetable>(url, lstConditions, { headers: this.headers })
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


  updateSchedule( scedules:any[] , classCode ): Observable<any> {
 
    const url = `${this.baseUrl}/UpdateSchedule?ClassCode=${classCode}`;
      var res = this.http.post<any[]>(url, scedules, { headers: this.headers })
        .pipe(
         tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.baseService.handleError)
          // tap(data => this.PrevResponse = data),

        ); 
    return res;

  }



  getSchedule(classCode ): Observable<any> {
 
    const url = `${this.baseUrl}/GetSchedule?ClassCode=${classCode}`;
      var res = this.http.post<any>(url, null, { headers: this.headers })
        .pipe(
         tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.baseService.handleError)
          // tap(data => this.PrevResponse = data),

        ); 
    return res;

  }

 
  getById(id: number): Observable<ITimetable> {
    if (id === 0) {
      return of(this.initialize());
    }

    const url = `${this.baseUrl}/GetById?Id=${id}`;
    return this.http.get<ITimetable>(url, { headers: this.headers })
      .pipe(
        tap(data => console.log('GetById: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }


  create(obj: ITimetable): Observable<ITimetable> {

    obj.Id = 0;
    return this.http.post<ITimetable>(this.baseUrl, obj, { headers: this.headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }

  update(obj: ITimetable): Observable<ITimetable> {
    console.log(obj);

    // new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}?id=${obj.Id}`;
    return this.http.put<ITimetable>(url, obj, { headers: this.headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + obj.Id)),
        // Return the ITimetable on an update
        map(() => obj),
        catchError(this.baseService.handleError)
      );
  }

  delete(id: number): Observable<{}> {

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<ITimetable>(url, { headers: this.headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.baseService.handleError)
      );
  }



  private initialize(): ITimetable {
    // Return an initialized object
    return {
      Id: 0,
      ClassCode: null,
      ClassId: 0,
      Period: null,
      Day: null,
      SchoolCode: null,
      SchoolId: 0,
      TeacherCode: null,
      TeacherId: 0,
      Subject: null,
      CreatedByCode: null,
      ModifiedByCode: null,
      RowVersionStr: null,
      CreatedDateTime: new Date(),
      ModifiedDateTime: new Date(),
    };
  }


}








