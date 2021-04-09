import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  throwError } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class BaseService {
   

  public  C_APP_URL : string = "https://localhost:44311/api";

  constructor( ) {

console.log('BaseService created');

   }
  
 
     
  public getHeaders() : any {
    console.log('getHeaders values in BaseService');
    const token = localStorage.getItem("jwt"); 
    console.log(token);
   return   new HttpHeaders ({ 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
        });
  }


  public handleError(err: HttpErrorResponse)  {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
       let detailMessage = '';
    console.log(err);
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    }  
    
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (err.error != null && err.error.detail != null) {
        errorMessage = err.error.detail;
      }
      else if (err.error != null && err.error.title != null) {
        errorMessage = err.error.title;
      }
      else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
   
      }
     
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }



  

  
}
