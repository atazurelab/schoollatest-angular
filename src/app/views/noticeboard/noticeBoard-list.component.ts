import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { INoticeBoard } from './noticeBoard';
import { NoticeBoardService } from './noticeBoard.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { MessagesService } from '../../common/messages.service';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';
import { SelectItem } from '../shared/SelectItem';


@Component({
  selector: 'app-noticeBoard-list',
  templateUrl: './noticeBoard-list.component.html' 
})
export class NoticeBoardListComponent implements OnInit {

  constructor(
    private noticeBoardService: NoticeBoardService, 
    private router: Router,
    private messagesService : MessagesService,
	private loggedInUserService :LoggedInUserService
    ) { }

  lstMain: INoticeBoard[];
  reverseSort = false;
  orderByField: string = 'Name';
  ordertype = '+';
  totalNoOfRecords = 0;
  RecordsPerPage = 10;
  currentPage: number = 1;
  isAdvanceView: boolean = true; 
  isLoading: boolean = false; 
  maxPageCount :number = 10;

  objSearch: any = { DateTo: null,  DateFrom: null,  CreatedByName: '', AuditType: '', Days: 1 }; 
  

  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent; 
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  ngOnInit(): void {
    if (this.noticeBoardService.IsLoaded) {
      this.currentPage = this.noticeBoardService.selectedPage; 
    } 
    
  }
 
  ngAfterViewInit(): void {
   
    setTimeout(()=>{  //<<<---using ()=> syntax
    
      this.searchNoticeBoards(this.currentPage, false);
 }, 500);
  }

  search(): void {
    this.searchNoticeBoards(this.currentPage, true);
  }

  pageChanged(arg): void {
    this.searchNoticeBoards(arg.page, true);
  }

  

  searchNoticeBoards(pageNo: number, isReload : boolean): void { 
    this.isLoading = true ;
    var lstConditions = this.getSearchParams();
    this.displayAlert.clearError();
    this.noticeBoardService.search(pageNo, this.RecordsPerPage, lstConditions, isReload).subscribe({
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
    if (this.objSearch.DateTo != null) {
      Items.push( {DBName: 'CreatedDateTime', Value: this.objSearch.DateTo.toString() + ';' + this.objSearch.DateFrom.toString() , DataType: DataType.Date, Operator: Operator.EqualTo });
    }
  
    Items.push({ DBName: 'SchoolCode', Value: this.loggedInUserService.loggedInUser.SchoolCode, DataType:  DataType.TextExact, Operator: Operator.EqualTo }) ; 
    
    if (Items.length > 0 ) {this.noticeBoardService.objSearch = this.objSearch;}
    return Items;
  }

   
  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/noticeBoards/create']);
    }     
    else if (key == "Refresh") {
     this. search();
    }
    else if (key == "Cancel") {
       
    } 
  }


}


