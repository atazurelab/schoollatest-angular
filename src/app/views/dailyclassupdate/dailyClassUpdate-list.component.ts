import { Component, OnInit, ViewChild,TemplateRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IDailyClassUpdate } from './dailyClassUpdate';
import { DailyClassUpdateService } from './dailyClassUpdate.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { ToolbarDetailsComponent } from '../shared/toolbar-details.component';
import { MessagesService } from '../../common/messages.service';
import { LoggedInUserService, DataType, Operator } from '../shared/loggedInUser.service';
import { SelectItem } from '../shared/SelectItem';
import { ToolbarListComponent } from '../shared/toolbar-list.component';


@Component({
  selector: 'app-dailyClassUpdate-list',
  templateUrl: './dailyClassUpdate-list.component.html' 
})
export class DailyClassUpdateListComponent implements OnInit {

  constructor(
    private dailyClassUpdateService: DailyClassUpdateService, 
    private router: Router,
    private fb: FormBuilder,
    private messagesService : MessagesService,    
    private modalService: BsModalService,
	private loggedInUserService :LoggedInUserService
    ) { }

  lstMain: IDailyClassUpdate[];
  reverseSort = false;
  orderByField: string = 'Period';
  ordertype = '+';
  totalNoOfRecords = 0;
  RecordsPerPage = 10;
  currentPage: number = 1;
  isAdvanceView: boolean = true; 
  isLoading: boolean = false; 
   maxPageCount :number = 10;
   UpdateForDate:Date;
   modalRef: BsModalRef | null;
  objSearch: any = { ClassCode: '',UpdateForDate:Date,  CreatedByName: '', AuditType: '', Days: 1 }; 
  ClasstList : SelectItem[];

  editForm = this.fb.group({
    ClassWork: new FormControl('',[Validators.maxLength(100)]),
    HomeWork: new FormControl('',[Validators.maxLength(100)]),

  });

  @ViewChild(ToolbarListComponent) toolbar: ToolbarListComponent;
  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent; 
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  ngOnInit(): void {
   this.toolbar.buttons = [{Text: 'Test1', Key: 'test1'}, {Text: 'Test2', Key: 'test2'}]
    if (this.dailyClassUpdateService.IsLoaded) {
      this.currentPage = this.dailyClassUpdateService.selectedPage; 
	    this.objSearch = this.dailyClassUpdateService.objSearch;
    } 
    
  }
 
  ngAfterViewInit(): void {
   
    setTimeout(()=>{  //<<<---using ()=> syntax
      this.ClasstList = this.loggedInUserService.Classes; 
      this.GetDCUByClass();
 }, 500);
  }

  search(): void {
    this.GetDCUByClass();
  }
    
   

  GetDCUByClass(): void {     
    this.displayAlert.clearError();
    this.dailyClassUpdateService.GetDCUByClass(this.objSearch.ClassCode, this.loggedInUserService.loggedInUser.SchoolCode, this .objSearch.UpdateForDate).subscribe({
      next: data => {
        this.lstMain = data; 
      },
      error: err => { this.lstMain = [];  this.displayAlert.showError(err) ;   this.isLoading = false ;},
     complete: () => {   this.isLoading = false ;}
    }); 
  }
 

   
  onOptionItemClicked(key: string): void {
    if (key == "Save") {
      this.save();
    }     
    else if (key == "Refresh") {
     this. search();
    }
    else if (key == "Cancel") {
       
    } 
  }

selectedDCU : IDailyClassUpdate;


  onEditDetails(selDCU: IDailyClassUpdate,   template: TemplateRef<any>) { 
    this.selectedDCU = selDCU;  
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  updateDCU(): void {
    this.modalRef.hide();  
    this.selectedDCU.HomeWork = this.editForm.value.HomeWork;
    this.selectedDCU.ClassWork = this.editForm.value.ClassWork;
    this.selectedDCU.IsModified = true ;
  }

 
  closeSchedule() {
    this.modalRef.hide();
  }

  save(): void {
    this.modalLoader.Show();
    this.displayAlert.clearError(); 
    this.dailyClassUpdateService  .updateDCU(this.lstMain  ).subscribe({
      next: data => {
        this.displayAlert.showSuccess('Schedule Updated Successfully.');
        this.editForm.reset();   
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });  
   
  }


}


