import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessagesService } from '../../common/messages.service';
import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { IPeriod } from './period';
import { PeriodService } from './period.service';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';
@Component({
  selector: 'app-period-list',
  templateUrl: './period-list.component.html' 
})
export class PeriodListComponent implements OnInit {

  constructor(
    private periodService: PeriodService,
    private router: Router,
    private messagesService: MessagesService,
    private loggedInUserService :LoggedInUserService
  ) { }

  lstMain: IPeriod[];
  reverseSort = false;
  orderByField: string = 'Name';
  ordertype = '+';
  totalNoOfRecords = 0;
  RecordsPerPage = 10;
  currentPage: number = 1;
  isAdvanceView: boolean = true;
  isLoading: boolean = false;
  SchoolCode :string = '';
  maxPageCount :number = 10;
  objSearch: any = { Name: '', CreatedByName: '', AuditType: '', Days: 1 , SchoolCode : this.SchoolCode};


  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  ngOnInit(): void {
    
    if (this.periodService.IsLoaded) {
      this.currentPage = this.periodService.selectedPage;
    }

  }

  ngAfterViewInit(): void {

    setTimeout(() => {  //<<<---using ()=> syntax
      this.searchPeriods(this.currentPage, false);
    }, 500);
  }

  search(): void {
    this.searchPeriods(this.currentPage, true);
  }

  pageChanged(arg): void {
    this.searchPeriods(arg.page, true);
  }



  searchPeriods(pageNo: number, isReload: boolean): void {
    this.isLoading = true;
    var lstConditions = this.getSearchParams();
    this.displayAlert.clearError();
    this.periodService.search(pageNo, this.RecordsPerPage, lstConditions, isReload).subscribe({
      next: data => {
        this.lstMain = data.Records;
        this.totalNoOfRecords = data.TotalRecords;
        let pg = Math.floor( this.totalNoOfRecords /10); 
        pg > 10 ? this.maxPageCount = 10: this.maxPageCount = pg +1 ;
      },
      error: err => { this.lstMain = []; this.displayAlert.showError(err); this.isLoading = false; },
      complete: () => { this.isLoading = false; }
    });
  }

  getSearchParams() {
    var Items = [];
    Items = [
      { DBName: 'Name', Value: this.objSearch.Name, DataType: 
 DataType.Text, Operator: Operator.EqualTo },
       { DBName: 'SchoolCode', Value: this.loggedInUserService.loggedInUser.SchoolCode, DataType:  DataType.TextExact, Operator: Operator.EqualTo },
    ];

    if (Items.length > 0 ) {this.periodService.objSearch = this.objSearch;}
    return Items;
  }


  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/periods/create', { id: -1 }]);
    }
    else if (key == "Refresh") {
      this.search();
    }
    else if (key == "Cancel") {

    }
  }


}


