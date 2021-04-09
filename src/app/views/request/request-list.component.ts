import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { IRequest } from './request';
import { RequestService } from './request.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { MessagesService } from '../../common/messages.service';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';
import { SelectItem } from '../shared/SelectItem';


@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html' 
})
export class RequestListComponent implements OnInit {

  constructor(
    private requestService: RequestService, 
    private router: Router,
    private messagesService : MessagesService,
	private loggedInUserService :LoggedInUserService
    ) { }

  lstMain: IRequest[];
  reverseSort = false;
  orderByField: string = 'Name';
  ordertype = '+';
  totalNoOfRecords = 0;
  RecordsPerPage = 10;
  currentPage: number = 1;
  isAdvanceView: boolean = true; 
  isLoading: boolean = false; 
  maxPageCount :number = 10;
  StudentList: SelectItem[] ;
  objSearch: any = { StudentId: '', CreatedByName: '', AuditType: '', Days: 1 }; 
  

  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent; 
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  ngOnInit(): void {
    if (this.requestService.IsLoaded) {
      this.currentPage = this.requestService.selectedPage; 
    }  
  }
 
  ngAfterViewInit(): void { 
    setTimeout(()=>{  //<<<---using ()=> syntax
      this.StudentList =  this.loggedInUserService.Students;
      this.searchRequests(this.currentPage, false);
  }, 500);
  }

  onStudentSelect(arg: any): void {
    this.objSearch.StudentId = arg.item.Id.toString() ;    
  }

  onStudentNotSelected(event: boolean): void {
    this.objSearch.StudentId =  "";
  }

  search(): void {
    this.searchRequests(this.currentPage, true);
  }

  clearSearch(): void {
    this.objSearch  = { StudentId: '', CreatedByName: '', AuditType: '', Days: 1 }; 
    this.searchRequests(this.currentPage, true);
  }


  pageChanged(arg): void {
    this.searchRequests(arg.page, true);
  }

  

  searchRequests(pageNo: number, isReload : boolean): void { 
    this.isLoading = true ;
    var lstConditions = this.getSearchParams();
    this.displayAlert.clearError();
    this.requestService.search(pageNo, this.RecordsPerPage, lstConditions, isReload).subscribe({
      next: data => {
        this.lstMain = data.Records;
        this.totalNoOfRecords = data.TotalRecords;
        let pg = Math.floor( this.totalNoOfRecords /10); 
        pg > 10 ? this.maxPageCount = 10: this.maxPageCount = pg +1 ;
      },
      error: err => { this.lstMain = [];  this.displayAlert.showError(err) ;   this.isLoading = false ;},
     complete: () => {   this.isLoading = false ;}
    }); 
  }
 
  getSearchParams() {
    var Items = [];
    Items = [
      { DBName: 'StudentId', Value: this.objSearch.StudentId , DataType: DataType.Int, Operator: Operator.EqualTo },
	    { DBName: 'SchoolId', Value: this.loggedInUserService.loggedInUser.SchoolId.toString(), DataType:  DataType.Int, Operator: Operator.EqualTo },
    ];
    if (Items.length > 0 ) {this.requestService.objSearch = this.objSearch;}
    return Items;
  }

   
  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/requests/create']);
    }     
    else if (key == "Refresh") {
     this. search();
    }
    else if (key == "Cancel") {
       
    } 
  }


}


