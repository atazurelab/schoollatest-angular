import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IFeeDetail } from './feeDetail';
import { FeeDetailService } from './feeDetail.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';

@Component({
  selector: 'app-feeDetail-create',
  templateUrl: './feeDetail-create.component.html'
})
export class FeeDetailCreateComponent implements OnInit {

   
  selectedId: number;
  isLoading: boolean = false;
  StatusList: any[] = ['Pending', 'Completed', 'Rejected'];
  StudentList : any[] = []
  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private feeDetailService: FeeDetailService,
    private loggedInUserService: LoggedInUserService) {
  }


  feeDetail: IFeeDetail = null;

  editForm = this.fb.group({
    Amount: new FormControl(0, [Validators.required]),
    DueDate: new FormControl(Date(), [Validators.required]),
    Status: new FormControl('', [Validators.required, Validators.maxLength(20),]),
    StudentCode: new FormControl('', [Validators.maxLength(20),]),
    StudentName: new FormControl(''),
    Description: new FormControl('', [Validators.maxLength(100),]),
    ReferenceNo: new FormControl('', [Validators.maxLength(20),]),
    StudentId: new FormControl(0, [Validators.required]),
    SchoolCode: new FormControl(0, [Validators.required]),

  });

  objMaster = { ...this.feeDetail };

  ngOnInit(): void {
    this.StudentList =  this.loggedInUserService.Students;
    this.editForm.patchValue({ SchoolCode: this.loggedInUserService.loggedInUser.SchoolCode });
  }

  loadUI(): void {
    this.isLoading = true;
    this.displayAlert.clearError();
    this.feeDetailService.getById(this.selectedId).subscribe({
      next: data => {
        this.feeDetail = data;
        this.objMaster = { ...this.feeDetail };
        this.populateUI(data);
      },
      error: err => { this.displayAlert.showError(err); },
      complete: () => { this.isLoading = false; }
    });
  }


  populateUI(obj: IFeeDetail): void {
    this.editForm.patchValue(obj);
  
  }

  onStudentSelect(arg: any): void {
    this.editForm.patchValue({ StudentId: arg.item.Id , StudentCode : arg.item.Value});
  }

  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/feeDetails/create']);
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
    this.feeDetail = { ...this.objMaster };
    this.editForm.patchValue(this.feeDetail);
    this.editForm.reset();
  }

  Save(): void {

    if (!this.editForm.valid) {
      this.displayAlert.showError('One or more value is invalid. Please clear error to continue...');
      return;
    }


    this.modalLoader.Show();
    this.feeDetail = this.editForm.value;
    this.feeDetailService.create(this.feeDetail).subscribe({
      next: data => {
        this.editForm.reset();
        this.displayAlert.showSuccess('Details Updated Successfully.')
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }

}



