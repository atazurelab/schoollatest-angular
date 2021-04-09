import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { IFeeDetail } from './feeDetail';
import { FeeDetailService } from './feeDetail.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { MessagesService } from '../../common/messages.service';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';
import { SelectItem } from '../shared/SelectItem';


@Component({
  selector: 'app-feeDetail-list',
  templateUrl: './feeDetail-list.component.html' 
})
export class FeeDetailListComponent implements OnInit {

  constructor(
    private feeDetailService: FeeDetailService, 
    private router: Router,
    private messagesService : MessagesService,
	private loggedInUserService :LoggedInUserService
    ) { }

  lstMain: IFeeDetail[];
  reverseSort = false;
  orderByField: string = 'Name';
  ordertype = '+';
  totalNoOfRecords = 0;
  RecordsPerPage = 10;
  currentPage: number = 1;
  isAdvanceView: boolean = true; 
  isLoading: boolean = false; 
  StudentList: SelectItem[] ;
  maxPageCount :number = 10;
  objSearch: any = { StudentName : '', StudentCode: '', CreatedByName: '', AuditType: '', Days: 1 }; 
  

  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent; 
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  ngOnInit(): void {
    if (this.feeDetailService.IsLoaded) {
      this.currentPage = this.feeDetailService.selectedPage; 
    } 
    
  }
 
  ngAfterViewInit(): void {
   
    setTimeout(()=>{  //<<<---using ()=> syntax
      this.StudentList =  this.loggedInUserService.Students;
      this.searchFeeDetails(this.currentPage, false);
 }, 500);
  }

  onStudentSelect(arg: any): void {
    this.objSearch.StudentCode = arg.item.Value ;    
  }


  search(): void {
    this.searchFeeDetails(this.currentPage, true);
  }

  pageChanged(arg): void {
    this.searchFeeDetails(arg.page, true);
  }

 

  searchFeeDetails(pageNo: number, isReload : boolean): void { 
    this.isLoading = true ;
    var lstConditions = this.getSearchParams();
    console.log(lstConditions);
    this.displayAlert.clearError();
    this.feeDetailService.search(pageNo, this.RecordsPerPage, lstConditions, isReload).subscribe({
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
      { DBName: 'StudentCode', Value: this.objSearch.StudentCode, DataType: DataType.TextExact, Operator: Operator.EqualTo},
	   { DBName: 'SchoolCode', Value: this.loggedInUserService.loggedInUser.SchoolCode, DataType:  DataType.TextExact, Operator: Operator.EqualTo },
    ];
    if (Items.length > 0 ) {this.feeDetailService.objSearch = this.objSearch;}
    return Items;
  }

   
  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/feeDetails/create']);
    }     
    else if (key == "Refresh") {
     this. search();
    }
    else if (key == "Cancel") {
       
    } 
  }


}


