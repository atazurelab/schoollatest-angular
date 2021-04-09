
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { IStudentData, IHolidayData, IStaffData, IPeriodData, INoticeBoardData, IClassData, IFeesData, ITimetableData } from './importdata';
import { ImportdataService } from './importdata.service';
import * as XLSX from 'xlsx';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';
import { INoticeBoard } from '../noticeBoard/noticeBoard';


type AOA = any[][];

@Component({
  selector: 'app-importdata',
  templateUrl: './importdata.component.html',
  styleUrls: ['./importdata.component.css']
})
export class ImportdataComponent implements OnInit {
  isLoading: boolean = false;

  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private importdataService: ImportdataService,
    private loggedInUserService: LoggedInUserService) {
  }

  listType: string;

  students: IStudentData[] = [];
  staffs: IStaffData[] = [];
  holidays: IHolidayData[] = [];
  periods: IPeriodData[] = [];
  noticeboards: INoticeBoardData[] = [];
  classes: IClassData[] = [];
  fees: IFeesData[] = [];
  timetables: ITimetableData[] =[];



  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  onFileChange(evt: any) {
    /* wire up file reader */
    this.isLoading = true;
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
       
      this.data = (<any>(XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, blankrows:false })));
      //let mydata = XLSX.utils.sheet_to_json(ws, {header:1,raw:false,dateNF:'yyyy-mm-dd'});
      console.log(this.data);
       this.editForm.patchValue({Records : this.data .length});

      if (this.listType == 'Student') {
        this.populateStudent();
      }
      else if (this.listType == 'ClassDetail') {
        this.populateClass();
      }
      else if (this.listType == 'Staff') {
        this.populateStaff();
      }
      else if (this.listType == 'Period') {
        this.populatePeriod();
      }
      else if (this.listType == 'Notice') {
        this.populateNoticeBoard();
      }
      else if (this.listType == 'Fee') {
        this.populateFee();
      }
      else if (this.listType == 'TimeTable') {
        this.populateTimetableData();
      }
      else if (this.listType == 'Holiday') {
        this.populateHoliday();
      }
      // var excelData = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);
      this.isLoading = false;

    };
    reader.onerror = (ex: any) => {
      this.displayAlert.showError('Error reading file.');
      this.isLoading = false;
    };
    reader.readAsBinaryString(target.files[0]);
  }


  populateStudent(): void {
    this.students = [];
    for (let index = 0; index < this.data.length; index++) {

      if (index > 0) {
        let obj = this.data[index];
        let stud: IStudentData =
        {
          Name: obj[0],
          Code: obj[1],
          ClassCode: obj[2],
          EmailId: obj[3],
          Mobile: obj[4],
          DateOfBirth: obj[5],
          Gender: obj[6],
          Address: obj[7]
        };
        this.students.push(stud);
      }
    }
  }


  populateStaff(): void {
    this.staffs = [];
    for (let index = 0; index < this.data.length; index++) {
 
      if (index > 0) {
        let obj = this.data[index];
        let s : IStaffData =
        { 

          Name: obj[0],
          Code: obj[1],
          ClassCode: obj[2],
          EmailId: obj[3],
          Mobile: obj[4],
          DateOfBirth: obj[5],
          Gender: obj[6],
          Address: obj[7],
          IsTeacher : (obj[8] == 'Y' || obj[8] == 'y')? true:false
        };
        this.staffs.push(s);
      }
    }
  }

  populatePeriod(): void {
    this.periods = [];
    for (let index = 0; index < this.data.length; index++) {

      if (index > 0) {
        let obj = this.data[index];
        let o: IPeriodData =
        {
          Name: obj[0],         
          Description: obj[1],
          ClassCode: ''
        };
        this.periods.push(o);
      }
    }
  }


  populateClass(): void {
    this.classes = [];
    for (let index = 0; index < this.data.length; index++) {
//Name	ClassCode	Descrption

      if (index > 0) {
        let obj = this.data[index];
        let o: IClassData =
        {
          Name: obj[0],
          ClassCode: obj[1],
          Description: obj[2]
        };
        this.classes.push(o);
      }
    }
  }
 
  populateNoticeBoard(): void {
    this.noticeboards = [];
     

    for (let index = 0; index < this.data.length; index++) {

      if (index > 0) {
        let obj = this.data[index];
        let o: INoticeBoardData =
        {
          Subject: obj[0],
          Notice: obj[1],
          NoticeDateTime: obj[2],
          EndDate:  null,
         
        };
        this.noticeboards.push(o);
      }
    }
  }

  populateHoliday(): void {
    this.holidays = [];
    for (let index = 0; index < this.data.length; index++) {
 

      if (index > 0) {
        let obj = this.data[index];
        let o: IHolidayData =
        {
          Name: obj[0],
          StartDate: obj[1],
          EndDate: obj[2],
          Description: obj[3]
        };
        this.holidays.push(o);
      }
    }
  }

  populateFee(): void {
    this.fees = [];
    ///StudentName	StudentCode	Amount	DueDate	Description	Status

    for (let index = 0; index < this.data.length; index++) { 

      if (index > 0) {
        let obj = this.data[index];
        let o: IFeesData =
        {         
          StudentCode: obj[1],
          Amount: parseInt(obj[2]),
          DueDate: obj[3],
          Description: obj[4],
          Status: obj[5] ,
          ReferenceNo :''      
        };
        this.fees.push(o);
      }
    }
  }

  populateTimetableData(): void {
    this.timetables = [];
    for (let index = 0; index < this.data.length; index++) {

      if (index > 0) {
        let obj = this.data[index];
        let o: ITimetableData =
        {

          ClassCode: obj[0],
          Period: obj[1],
          Monday: obj[2],
          Tuesday: obj[3],
          Wednesday: obj[4],
          Thursday: obj[5],
          Friday: obj[6],
          Saturday: obj[7],
          Sunday: obj[8]
        }
        this.timetables.push(o);
      }
    }
  }



  editForm = this.fb.group({
    Records : [0, [Validators.required]]
  });

  ngOnInit(): void {

  }

  loadUI(): void {

  }


  populateUI(obj: IStudentData): void {

  }


  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/classDetails/create']);
    }
    else if (key == "Save") {
      this.Save();
    }
    else if (key == "Cancel") {
      this.onCancel();
    }
    else if (key == "Refresh") {
      this.loadUI();
    }
  }

  onCancel(): void {

  }

  Save(): void {
    

    if (!this.editForm.valid) {
      this.displayAlert.  showError('No ' + this.listType  + ' records to import. PLease select a excel file.')
    return ;
    }

    this.modalLoader.Show();

    var httpclient = null;

    if (this.listType == 'Students') {
      httpclient = this.importdataService.importStudent(this.students);
    }
    else if (this.listType == 'ClassDetail') {
      httpclient = this.importdataService.importClasses(this.classes);
    }
    else if (this.listType == 'Staff') {
      httpclient = this.importdataService.importStaff(this.staffs);
    }
    else if (this.listType == 'Period') {
      httpclient = this.importdataService.importPeriod(this.periods);
    }
    else if (this.listType == 'Notice') {
      httpclient = this.importdataService.importNoticeBoard(this.noticeboards);
    }
    else if (this.listType == 'Fee') {
      httpclient = this.importdataService.importFee(this.fees);
    }
    else if (this.listType == 'TimeTable') {
      httpclient = this.importdataService.importTimeTable(this.timetables);
    }
    else if (this.listType == 'Holiday') {
      httpclient = this.importdataService.importHoliday(this.holidays);
    }
  


    httpclient.subscribe({
      next: data => {
        this.editForm.reset();
        this.displayAlert.showSuccess(this.listType + ' Details Updated Successfully.')
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }

}




