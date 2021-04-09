import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IStaff } from './staff';
import { StaffService } from './staff.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html'
})
export class StaffCreateComponent implements OnInit {

  GenderList : any[] = [{Value:'M',Text:'Male'},{Value:'F',Text:'Female'},{Value:'T',Text:'Transgender'}];

  selectedId: number;
  isLoading: boolean = false;
  
  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private staffService: StaffService,
    private loggedInUserService :LoggedInUserService) {
  }


  staff: IStaff = null;

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

    this.editForm.patchValue({DateOfBirth : null , IsDeleted: false,   SchoolCode : this.loggedInUserService.loggedInUser.SchoolCode})
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
  }


  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/staffs/create']);
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
    this.staff = { ...this.objMaster };
    this.editForm.patchValue(this.staff);
    this.editForm.reset();
  }


  

  Save(): void {

    if (!this.editForm.valid) {
      this.displayAlert.showError('One or more value is invalid. Please clear error to continue...');
      return ;
    }

    this.modalLoader.Show();
    this.staff = this.editForm.value;
    console.log(this.staff);
    this.staffService.create(this.staff).subscribe({
      next: data => {
        this.editForm.reset();
        this.displayAlert.showSuccess('Details Updated Successfully.')
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }

}



