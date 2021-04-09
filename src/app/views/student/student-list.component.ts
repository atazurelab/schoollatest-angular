import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { IStudent } from './student';
import { StudentService } from './student.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { MessagesService } from '../../common/messages.service';
import { LoggedInUserService, DataType, Operator } from '../shared/loggedInUser.service';
import { SelectItem } from '../shared/SelectItem'; 


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html'
})
export class StudentListComponent implements OnInit {

  constructor(
    private studentService: StudentService,
    private router: Router,
    private messagesService: MessagesService,
    private loggedInUserService: LoggedInUserService
  ) { }

  lstMain: IStudent[];
  reverseSort = false;
  orderByField: string = 'Name';
  ordertype = '+';
  totalNoOfRecords = 0;
  RecordsPerPage = 10;
  currentPage: number = 1;
  isAdvanceView: boolean = true;
  isLoading: boolean = false;
  StudentList: SelectItem[];
  ClasstList: SelectItem[];

  objSearch: any = { Id: '', ClassCode: '', CreatedByName: '', AuditType: '', Days: 1 };


  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  ngOnInit(): void {
    if (this.studentService.IsLoaded) {
      this.currentPage = this.studentService.selectedPage;
      this.objSearch = this.studentService.objSearch;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {  //<<<---using ()=> syntax
      this.StudentList = this.loggedInUserService.Students;
      this.ClasstList = this.loggedInUserService.Classes; 
      this.searchStudents(this.currentPage, false);
    }, 500);
  }

  onStudentSelect(arg: any): void {
    this.objSearch.Id = arg.item.Id.toString();
  }

  onStudentNotSelected(event: boolean): void {
    this.objSearch.Id = "";
  }
  search(): void {
    this.searchStudents(this.currentPage, true);
  }

  pageChanged(arg): void {
    this.searchStudents(arg.page, true);
  }



  searchStudents(pageNo: number, isReload: boolean): void {
    this.isLoading = true;
    var lstConditions = this.getSearchParams();
    this.displayAlert.clearError();
    this.studentService.search(pageNo, this.RecordsPerPage, lstConditions, isReload).subscribe({
      next: data => {
        this.lstMain = data.Records;
        this.totalNoOfRecords = data.TotalRecords;

      },
      error: err => { this.lstMain = []; this.displayAlert.showError(err); this.isLoading = false; },
      complete: () => { this.isLoading = false; }
    });
  }

  getSearchParams() {
    var Items = [];
    
    Items = [
      { DBName: 'Id', Value: this.objSearch.Id, DataType: DataType.Int, Operator: Operator.EqualTo },
      { DBName: 'ClassCode', Value: this.objSearch.ClassCode, DataType: DataType.TextExact, Operator: Operator.EqualTo },
      { DBName: 'SchoolCode', Value: this.loggedInUserService.loggedInUser.SchoolCode, DataType: DataType.TextExact, Operator: Operator.EqualTo },
    ];

    if (Items.length > 0 ) {this.studentService.objSearch = this.objSearch;}
    return Items;
  }


  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/students/create']);
    }
    else if (key == "Refresh") {
      this.search();
    }
    else if (key == "Cancel") {

    }
  }


}


