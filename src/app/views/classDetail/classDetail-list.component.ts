import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessagesService } from '../../common/messages.service';
import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { IClassDetail } from './classDetail';
import { ClassDetailService } from './classDetail.service';
import { LoggedInUserService, DataType, Operator } from '../shared/loggedInUser.service';

@Component({
  selector: 'app-classDetail-list',
  templateUrl: './classDetail-list.component.html'
})
export class ClassDetailListComponent implements OnInit {

  constructor(
    private classDetailService: ClassDetailService,
    private router: Router,
    private messagesService: MessagesService,
    private loggedInUserService: LoggedInUserService
  ) { }

  lstMain: IClassDetail[];
  reverseSort = false;
  orderByField: string = 'Name';
  ordertype = '+';
  totalNoOfRecords = 0;
  RecordsPerPage = 10;
  currentPage: number = 1;
  isAdvanceView: boolean = true;
  isLoading: boolean = false;
  maxPageCount :number = 10;
  objSearch: any = { Name: '', CreatedByName: '', AuditType: '', Days: 1 };


  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  ngOnInit(): void {
    if (this.classDetailService.IsLoaded) {
      this.currentPage = this.classDetailService.selectedPage;
    }

  }

  ngAfterViewInit(): void {

    setTimeout(() => {  //<<<---using ()=> syntax
      this.searchClassDetails(this.currentPage, false);
    }, 500);
  }

  search(): void {
    this.searchClassDetails(this.currentPage, true);
  }

  pageChanged(arg): void {
    this.searchClassDetails(arg.page, true);
  }



  searchClassDetails(pageNo: number, isReload: boolean): void {
    this.isLoading = true;
    var lstConditions = this.getSearchParams();
    this.displayAlert.clearError();
    this.classDetailService.search(pageNo, this.RecordsPerPage, lstConditions, isReload).subscribe({
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
      {
        DBName: 'Name', Value: this.objSearch.Name, DataType: DataType.Text, Operator: Operator.EqualTo },
      { DBName: 'SchoolCode', Value: this.loggedInUserService.loggedInUser.SchoolCode, DataType: DataType.TextExact, Operator: Operator.EqualTo },
    ];
    if (Items.length > 0 ) {this.classDetailService.objSearch = this.objSearch;}
    return Items;
  }


  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/classDetails/create']);
    }
    else if (key == "Refresh") {
      this.search();
    }
    else if (key == "Cancel") {

    }
  }


}


