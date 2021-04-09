import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IClassData, IFeesData, IHolidayData, INoticeBoardData, IPeriodData, IStaffData, IStudentData, ITimetableData } from './importdata';
import { BaseService } from '../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class ImportdataService {
  private PrevResponse: any;
  public selectedPage: number;
  public IsLoaded: boolean = false;
  private baseUrl = this.baseService.C_APP_URL + '/import';
  public objSearch :any;


  get headers(): HttpHeaders {
    return this.baseService.getHeaders();
  }

  constructor(private http: HttpClient, private baseService: BaseService) { }
 

  importStudent(records: IStudentData[]): Observable<IStudentData[]> { 
    const url = this.baseService.C_APP_URL + '/import/ImportStudent';
    return this.http.post<IStudentData[]>(url, records, { headers: this.headers })
      .pipe(
      //  tap(data => console.log('studts: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  } 

  
  importStaff(records: IStaffData[]): Observable<IStaffData[]> { 
    const url = this.baseService.C_APP_URL + '/import/ImportStaff';
    return this.http.post<IStaffData[]>(url, records, { headers: this.headers })
      .pipe(
      //  tap(data => console.log('studts: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }


  
  importClasses(records: IClassData[]): Observable<IClassData[]> { 
    const url = this.baseService.C_APP_URL + '/import/ImportClass';
    return this.http.post<IClassData[]>(url, records, { headers: this.headers })
      .pipe(
      //  tap(data => console.log('studts: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }

  
  importPeriod(records: IPeriodData[]): Observable<IPeriodData[]> { 
       const url = this.baseService.C_APP_URL + '/import/ImportPeriod';
    return this.http.post<IPeriodData[]>(url, records, { headers: this.headers })
      .pipe(
        tap(data => console.log('studts: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }


  
  importTimeTable(records: ITimetableData[]): Observable<ITimetableData[]> { 
    const url = this.baseService.C_APP_URL + '/import/ImportTimetable'; 
    return this.http.post<ITimetableData[]>(url, records, { headers: this.headers })
      .pipe(
     //   tap(data => console.log('studts: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }
 
  
  importHoliday(records: IHolidayData[]): Observable<IHolidayData[]> { 
    const url = this.baseService.C_APP_URL + '/import/ImportHoliday'; 
    return this.http.post<IHolidayData[]>(url, records, { headers: this.headers })
      .pipe(
      //  tap(data => console.log('studts: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }

  importFee(records: IFeesData[]): Observable<IFeesData[]> { 
    const url = this.baseService.C_APP_URL + '/import/ImportFee'; 
    return this.http.post<IFeesData[]>(url, records, { headers: this.headers })
      .pipe(
     //   tap(data => console.log('studts: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }

  
  importNoticeBoard(records: INoticeBoardData[]): Observable<INoticeBoardData[]> { 
    const url = this.baseService.C_APP_URL + '/import/ImportNotice'; 
    return this.http.post<INoticeBoardData[]>(url, records, { headers: this.headers })
      .pipe(
       // tap(data => console.log('studts: ' + JSON.stringify(data))),
        catchError(this.baseService.handleError)
      );
  }


}








