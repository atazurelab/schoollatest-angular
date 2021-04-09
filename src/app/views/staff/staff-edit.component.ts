import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IStaff } from './staff';
import { StaffService } from './staff.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html'
})
export class StaffEditComponent implements OnInit {

  selectedId: number;
  isLoading: boolean = false;
  staff: IStaff = null;
  GenderList : any[] = [{Value:'M',Text:'Male'},{Value:'F',Text:'Female'},{Value:'T',Text:'Transgender'}];

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private staffService: StaffService,
    private loggedInUserService :LoggedInUserService) {
  }

  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  editForm = this.fb.group({
    Salutation: new FormControl('', [Validators.maxLength(10)]),
    Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    Code: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    DateOfBirth: new FormControl(Date(), []),
    SchoolCode: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    Gender: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    EmailID: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    Mobile: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    IsDeleted: new FormControl(false, []),
    IsTeacher: new FormControl(false, []),
    IsAdmin: new FormControl(false, []),

  });

  objMaster = { ...this.staff };

  ngOnInit(): void {
    this.selectedId = this.activatedRouter.snapshot.params.id;
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.editForm.patchValue({SchoolCode : this.loggedInUserService.loggedInUser.SchoolCode})
      this.loadUI();
    }, 500);
  }

  loadUI(): void {
    this.isLoading = true;
    this.displayAlert.clearError();
    this.staffService.getById(this.selectedId).subscribe({
      next: data => {
        this.staff = data;
        this.objMaster = { ...this.staff };
        this.populateUI(data);
      },
      error: err => { this.displayAlert.showError(err); },
      complete: () => { this.isLoading = false; }
    });
  }

  populateUI(obj: IStaff): void {
    this.editForm.patchValue(obj);
    this.editForm.patchValue({DateOfBirth : new Date(obj.DateOfBirth)});
  }

  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/staffs/create', { id: -1 }]);

    }
    else if (key == "Save") {
      this.Save();
    }
    else if (key == "Cancel") {
      this.onCancel();
    }

  }



  onCancel(): void {
    this.staff = { ...this.objMaster };
    this.editForm.patchValue(this.staff);
    this.editForm.reset();
  }

  UpdateStaffLogin(): void {

    if (!this.editForm.valid) {
      this.displayAlert.showError('One or more value is invalid. Please clear error to continue...');
      return ;
    }

    this.modalLoader.Show();
    this.staff = this.editForm.value;
    console.log(this.staff);
    this.staffService.UpdateStaffLogin(this.staff).subscribe({
      next: data => {
        this.editForm.reset();
        this.displayAlert.showSuccess("Login Details Updated and send to staff's emailId.")
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }

  Save(): void {
    if (!this.editForm.valid) {
      this.displayAlert.showError('One or more value is invalid. Please clear error to continue...');
      return ;
    }

    this.modalLoader.Show();
    this.displayAlert.clearError();
    this.staff = this.editForm.value;
    this.staff.Id = this.objMaster.Id;
    this.staff.RowVersionStr = this.objMaster.RowVersionStr; 
    this.staffService.update(this.staff).subscribe({
      next: data => {
        this.displayAlert.showSuccess('Details Updated Successfully.');
        this.editForm.reset();   
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }
}
