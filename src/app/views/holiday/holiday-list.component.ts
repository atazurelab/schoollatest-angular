import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { IHoliday } from './holiday';
import { HolidayService } from './holiday.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { MessagesService } from '../../common/messages.service';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';
 


@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html' 
})
export class HolidayListComponent implements OnInit {

  constructor(
    private holidayService: HolidayService, 
    private router: Router,
    private messagesService : MessagesService,
	private loggedInUserService :LoggedInUserService
    ) { }

  lstMain: IHoliday[];
  reverseSort = false;
  orderByField: string = 'Name';
  ordertype = '+';
  totalNoOfRecords = 0;
  RecordsPerPage = 10;
  currentPage: number = 1;
  isAdvanceView: boolean = true; 
  isLoading: boolean = false; 
  maxPageCount :number = 10;
  objSearch: any = { Name: '',   AuditType: '', Days: 0, FromDate :'' }; 
  RangeDate :Date;


  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent; 
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  ngOnInit(): void {
    
    if (this.holidayService.IsLoaded) {
      this.currentPage = this.holidayService.selectedPage; 
    } 
    
  }
 
  ngAfterViewInit(): void {
   
    setTimeout(()=>{  //<<<---using ()=> syntax
      this.searchHolidays(this.currentPage, false);
 }, 500);
  }

  search(): void {
    this.searchHolidays(this.currentPage, true);
  }

  pageChanged(arg): void {
    this.searchHolidays(arg.page, true);
  }

  

  searchHolidays(pageNo: number, isReload : boolean): void { 
    this.isLoading = true ;
    var lstConditions = this.getSearchParams();
    this.displayAlert.clearError();
    this.holidayService.search(pageNo, this.RecordsPerPage, lstConditions, isReload).subscribe({
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
      { DBName: 'Name', Value: this.objSearch.Name, DataType:  DataType.Text, Operator: Operator.EqualTo },
       { DBName: 'SchoolCode', Value: this.loggedInUserService.loggedInUser.SchoolCode, DataType:  DataType.TextExact, Operator: Operator.EqualTo },
    ];

 
    if (this.objSearch.Days > 0 && this.RangeDate != null && this.objSearch.AuditType  != null) {
    
      this.objSearch.FromDate =  this.RangeDate ;
      Items.push({ 
        DBName: 'Records', 
        Value: this.objSearch.AuditType + ';' +   this.objSearch.Days + ';' +   this.objSearch.FromDate ,
        DataType:  DataType.Text,
        Operator: Operator.EqualTo }
        )}; 

    if (Items.length > 0 ) {this.holidayService.objSearch = this.objSearch;}
    return Items;
  }

   
  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/holidays/create']);
    }     
    else if (key == "Refresh") {
     this. search();
    }
    else if (key == "Cancel") {
       
    } 
  }


}


