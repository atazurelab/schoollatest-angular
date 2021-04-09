import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router, RouterModule } from '@angular/router';

import { ITimetable, ISchedule } from './timetable';
import { TimetableService } from './timetable.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { MessagesService } from '../../common/messages.service';
import { LoggedInUserService, DataType, Operator } from '../shared/loggedInUser.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectItem } from '../shared/SelectItem';


@Component({
  selector: 'app-timetable-list',
  templateUrl: './timetable-list.component.html'
})
export class TimetableListComponent implements OnInit {

  constructor(
    private timetableService: TimetableService,
    private fb: FormBuilder,
    private router: Router,
    private messagesService: MessagesService,
    private loggedInUserService: LoggedInUserService,
    private modalService: BsModalService
  ) { }

  lstMain: ISchedule[];
  TeacherList: SelectItem[];
  ClasstList: SelectItem[];
  SubjectList: string[];

  reverseSort = false;
  orderByField: string = 'Name';
  ordertype = '+';
  totalNoOfRecords = 0;
  RecordsPerPage = 10;
  currentPage: number = 1;
  isAdvanceView: boolean = true;
  isLoading: boolean = false;
  modalRef: BsModalRef | null;
  objSearch: any = { ClassCode: 'C002', CreatedByName: '', AuditType: '', Days: 1 };

  editForm = this.fb.group({
    TeacherId: new FormControl('', [Validators.required]),
    Subject: new FormControl('', [Validators.required, Validators.maxLength(20),]),
    IsRepeat : new FormControl(false)

  });

  Days : string[] =   ["Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  ngOnInit(): void {
    if (this.timetableService.IsLoaded) {
      this.currentPage = this.timetableService.selectedPage;
    }
    this.TeacherList = this.loggedInUserService.Teachers;
    this.SubjectList = this.loggedInUserService.Subjects;
    this.ClasstList = this.loggedInUserService.Classes; 
  }



  ngAfterViewInit(): void {

    setTimeout(() => {  //<<<---using ()=> syntax
     
      this.GetSchedule();
    }, 500);
  }

  search(): void {
    this.GetSchedule();
  }

  pageChanged(arg): void {
    //this.searchTimetables(arg.page, true);
  }

  GetSchedule(): void {
    this.isLoading = true;

    this.displayAlert.clearError();
    this.timetableService.getSchedule(this.objSearch.ClassCode).subscribe({
      next: data => { 
        this.lstMain = data.Schedules;
       this. totalNoOfRecords  = this.lstMain.length;
      },
      error: err => { this.lstMain = []; this.displayAlert.showError(err); this.isLoading = false; },
      complete: () => { this.isLoading = false; }
    });
  }

  /* searchTimetables(pageNo: number, isReload: boolean): void {
    this.isLoading = true;
    var lstConditions = this.getSearchParams();
    this.displayAlert.clearError();
    this.timetableService.search(pageNo, this.RecordsPerPage, lstConditions, isReload).subscribe({
      next: data => {
        this.lstMain = data.Records;
        this.totalNoOfRecords = data.TotalRecords;

      },
      error: err => { this.lstMain = []; this.displayAlert.showError(err); this.isLoading = false; },
      complete: () => { this.isLoading = false; }
    });
  } */

  getSearchParams() {
    var Items = [];
    Items = [
      {
        DBName: 'Name', Value: this.objSearch.Name, DataType:
          DataType.Text, Operator: Operator.EqualTo
      },
      { DBName: 'SchoolCode', Value: this.loggedInUserService.loggedInUser.SchoolCode, DataType: DataType.TextExact, Operator: Operator.EqualTo },
    ];
    if (Items.length > 0) { this.timetableService.objSearch = this.objSearch; }
    return Items;
  }

  timetable: ITimetable;
  schedule: ISchedule;
  selDay: string;


  onEditDetails(selSchedule: ISchedule, day: string, template: TemplateRef<any>) {
 
    this.selDay = day;
    this.schedule = selSchedule; 
    this.timetable = selSchedule["Obj" + day]; 
    this.editForm.patchValue({Subject : this.timetable.Subject,TeacherId: this.timetable.TeacherId   })
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }   

  saveSchedule(): void {
    this.modalRef.hide();

    this.timetable.TeacherId = parseInt(this.editForm.value.TeacherId);
    let teacher = this.TeacherList.filter(o => o.Id == this.timetable.TeacherId)[0];
    this.timetable.TeacherCode = teacher.Value
    this.timetable.Subject = this.editForm.value.Subject;
    this.timetable.IsModified = true;
    this.timetable[this.selDay] = this.timetable.Subject + " : " +  teacher.Text  ;
    this.schedule[this.selDay] = this.timetable.Subject + " : " +  teacher.Text  ;
    this.schedule["Obj" + this.selDay] = this.timetable; 

  console.log(teacher);

    if (this.editForm.value.IsRepeat) {
  //Update this schedule for every day in week
      this.Days.forEach(dayname => {
        let obj =  this.schedule["Obj" + dayname]; 
        console.log(dayname);  
        console.log('obj', obj);   
        obj.TeacherId = teacher.Id;
        obj.TeacherCode = teacher.Value;
        obj.TeacherCode = teacher.Value;
        obj.Subject = this.timetable.Subject
        obj[dayname] = this.timetable.Subject + " : " +  teacher.Text  ;
        this.schedule[dayname] =this.timetable.Subject + " : " +  teacher.Text  ;
        obj.IsModified = true;
    });

    }


  }


  updateSchedule(): void { 
    this.modalLoader.Show();
    this.displayAlert.clearError(); 
    this.timetableService.updateSchedule(this.lstMain, this.objSearch.ClassCode).subscribe({
      next: data => {
        this.displayAlert.showSuccess('Schedule Updated Successfully.');
        this.editForm.reset();   
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });  
   
   
  }

 
  closeSchedule() {
    this.modalRef.hide();
  }

  onOptionItemClicked(key: string): void {
    if (key == "Save") {
      this.updateSchedule();
    }
    else if (key == "Refresh") {
      this.search();
    }
    else if (key == "Cancel") {

    }
  }


}


