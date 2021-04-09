import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessagesService } from '../../common/messages.service';
import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { ISchool } from './school';
import { SchoolService } from './school.service';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html' 
})
export class SchoolListComponent implements OnInit {

  constructor(
    private schoolService: SchoolService, 
    private router: Router,
    private messagesService : MessagesService,
    private loggedInUserService :LoggedInUserService
    ) { }

  lstMain: ISchool[];
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
    if (this.schoolService.IsLoaded) {
      this.currentPage = this.schoolService.selectedPage; 
    } 
    
  }
 
  ngAfterViewInit(): void {
   
    setTimeout(()=>{  //<<<---using ()=> syntax
      this.searchSchools(this.currentPage, false);
 }, 500);
  }

  search(): void {
    this.searchSchools(this.currentPage, true);
  }

  pageChanged(arg): void {
    this.searchSchools(arg.page, true);
  }

  

  searchSchools(pageNo: number, isReload : boolean): void { 
    this.isLoading = true ;
    var lstConditions = this.getSearchParams();
    this.displayAlert.clearError();
    this.schoolService.search(pageNo, this.RecordsPerPage, lstConditions, isReload).subscribe({
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
      { DBName: 'Name', Value: this.objSearch.Name, DataType: 
 DataType.Text, Operator: Operator.EqualTo },
       { DBName: 'Code', Value: this.loggedInUserService.loggedInUser.SchoolCode, DataType:  DataType.TextExact, Operator: Operator.EqualTo },
    ];
    if (Items.length > 0 ) {this.schoolService.objSearch = this.objSearch;}
    return Items;
  }

   
  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/schools/create']);
    }     
    else if (key == "Refresh") {
     this. search();
    }
    else if (key == "Cancel") {
       
    } 
  }


}


