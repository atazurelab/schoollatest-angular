 
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../../_nav';
import { LoggedInUserService, DataType,Operator } from '../../views/shared/loggedInUser.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

  constructor(
    
    private router: Router, 
	private loggedInUserService :LoggedInUserService
    ) { }

  public sidebarMinimized = false;
  public navItems = navItems;
  schoolId : number ;
  staffId : number;
  schoolShortName : string;

  toggleMinimize(e) {
    this.sidebarMinimized = e; 
  }

  ngOnInit(): void {    

    this.loggedInUserService.School

   this.schoolId = this. loggedInUserService.loggedInUser.SchoolId ;  
   this.staffId = this. loggedInUserService.loggedInUser.Id ; 
    if (this. loggedInUserService.School == null)  {
    this. loggedInUserService.getSchool().subscribe({
      next: data => { 
        console.log(data) ;
        this. loggedInUserService.School = data;
        this.schoolShortName = this. loggedInUserService.School.Name;
      },
      error: err => {   },
      complete: () => {   }
    });
    }
    else {
      this.schoolShortName = this. loggedInUserService.School.Name;
    }
    
  }

  

  onLogout():void{
    this.loggedInUserService.loggedInUser = null;
    localStorage.setItem("jwt", null);
    localStorage.setItem("refreshToken", null);
    this.router.navigate(["login"]);
    console.log('onLogout');
  }

//<a routerLinkActive='active' [routerLink]="['/holidays/edit', obj.Id]">{{obj.Id}}</a>

}
