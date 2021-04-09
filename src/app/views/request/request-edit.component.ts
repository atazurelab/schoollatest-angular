import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IRequest } from './request';
import { RequestService } from './request.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';

import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';


@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html'
})
export class RequestEditComponent implements OnInit {

  selectedId: number;
  isLoading: boolean = false;
  request: IRequest = null;
  StatusList: any[] = ['Pending', 'Approved', 'Rejected']
  CategoryList: any[] = ['LeaveApplication', 'SnacksRequest', 'StationaryRequest']
  StudentList: any[] = [{ Id: 1001, Value: 'ST001', Text: 'Student 1' }, { Id: 1002, Value: 'ST002', Text: 'Student 2' }]
  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private loggedInUserService: LoggedInUserService) {
  }

  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  editForm = this.fb.group({ 
    Remarks: new FormControl('', [ Validators.maxLength(100)]),
    RemarkDateTime: new FormControl(Date()), 
    Status: new FormControl('', [Validators.required, Validators.maxLength(20),])

  });

  objMaster = { ...this.request };

  ngOnInit(): void {
    this.selectedId = this.activatedRouter.snapshot.params.id;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadUI();
    }, 500);
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
    this.editForm.patchValue({RemarkDateTime : new Date(obj.RemarkDateTime)});
    this.editForm.value.StudentId = obj.StudentId.toString();
    
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

  }
  response : any;

  public uploadFinished = (event) => {
    this.response = event;
    console.log(event);
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
    this.displayAlert.clearError();

    if (this.editForm.value.Remarks != null) {
      this.request.RemarkDateTime = new Date();
    }
    this.request.Remarks = this.editForm.value.Remarks;
    this.request.Status = this.editForm.value.Status;
     
  

     //this.request.Id = this.objMaster.Id;
    //this.request.StudentId = Number.parseInt( this.editForm.value.StudentId); 
    //this.request.SchoolId = this.loggedInUserService.loggedInUser.SchoolId; 
    console.log(this.request);
    this.request.RowVersionStr = this.objMaster.RowVersionStr;  
   
    this.requestService.update(this.request).subscribe({
      next: data => {
        this.displayAlert.showSuccess('Details Updated Successfully.');
        this.editForm.reset();      
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }
}
