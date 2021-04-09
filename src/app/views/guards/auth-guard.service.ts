import { Injectable } from '@angular/core';
import { CanActivate, Router ,  ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';

 

import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, 
    private router: Router, 
    private http: HttpClient, 
    private loggedInUserService : LoggedInUserService) {
  }

 

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const    token    = localStorage.getItem("jwt");
   /*  console.log('token Value : ', token);
    let vtoken : typeof token | undefined;
    console.log(vtoken);*/  
    if (  this.loggedInUserService.loggedInUser === undefined ) { 
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url }});
      return false;
    } 
   
    if (  token   && !this.jwtHelper.isTokenExpired(token)) {        
      return true;
    }

    const isRefreshSuccess = await this.tryRefreshingTokens(token);
    if (!isRefreshSuccess) { 
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url }});
    } 
    return isRefreshSuccess;
  }

  private async tryRefreshingTokens(token: string): Promise<boolean> {
    // Try refreshing tokens using refresh token
    const refreshToken: string = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {      
      return false;
    }

    const credentials = JSON.stringify({ AccessToken: token, RefreshToken: refreshToken });

    let isRefreshSuccess: boolean;

    try {
      const response = await this.http.post("https://localhost:44311/api/token/refresh", credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        observe: 'response'
      }).toPromise();
      // If token refresh is successful, set new tokens in local storage.
         
      const newToken = (<any>response).body.AccessToken;
      const newRefreshToken = (<any>response).body.RefreshToken;
      localStorage.setItem("jwt", newToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      isRefreshSuccess = true;
    }
    catch (ex) {      
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }

}
