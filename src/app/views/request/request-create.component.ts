import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IRequest } from './request';
import { RequestService } from './request.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html'
})
export class RequestCreateComponent implements OnInit {

 
  selectedId: number;
  isLoading: boolean = false;

  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private loggedInUserService: LoggedInUserService) {
  }
   
 
  StatusList : any[] = ['Pending', 'Approved','Rejected' ]
  CategoryList : any[] = ['LeaveApplication', 'SnacksRequest','StationaryRequest' ]
  StudentList : any[];// = [ {Id:1001,   Value : '1001', Text:'Student 1'},{Id:1002, Value : '1002', Text:'Student 2'} ]
  request: IRequest = null;

  editForm = this.fb.group({
    Subject: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    Category: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    Description: new FormControl('', [Validators.maxLength(100)]),
    StudentId: new FormControl(0, [Validators.required, Validators.min(1)]) , 
    StudentName: new FormControl('') ,
    Status: new FormControl('Pending') ,
  });

  objMaster = { ...this.request };

  ngOnInit(): void {
   this. StudentList =  this.loggedInUserService.Students;    
  }


  ngAfterViewInit(): void {
    /* setTimeout(() => {
      this.isLoading = true;
      this.loggedInUserService.getStudents().subscribe({
       next: data => {
         this. StudentList =  data.Students ;
       },
       error: err => { this.displayAlert.showError(err); },
       complete: () => { this.isLoading = false; }
     });
    }, 500); */
  }


  onStudentSelect(arg: any): void { 
      this.editForm.patchValue({StudentId : arg.item.Id});
  }


  loadUI(): void {
    this.isLoading = true;
    this.displayAlert.clearError();
    this.requestService.getById(this.selectedId).subscribe({
      next: data => {
        this.request = data;
        this.objMaster = { ...this.request };
        this.populateUI(data);
      },
      error: err => { this.displayAlert.showError(err); },
      complete: () => { this.isLoading = false; }
    });
  }


  populateUI(obj: IRequest): void {
    this.editForm.patchValue(obj);
    
  }


  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/requests/create']);
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
    this.request = { ...this.objMaster };
    this.editForm.patchValue(this.request);
    this.editForm.reset();
  }

  Save(): void {

if (!this.editForm.valid) {
  this.displayAlert.showError('One or more value is invalid. Please clear error to continue...');
  return ;
}

    this.modalLoader.Show();
    console.log('formvalue', this.editForm.value);
    this.request = this.editForm.value;
    this.request.StudentId = Number.parseInt( this.editForm.value.StudentId); 
    this.request.SchoolId = this.loggedInUserService.loggedInUser.SchoolId; 
    console.log(this.request);
    this.requestService.create(this.request).subscribe({
      next: data => {
        this.editForm.reset();
        this.displayAlert.showSuccess('Details Updated Successfully.')
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }




}



