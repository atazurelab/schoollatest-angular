import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ISchool } from './school';
import { SchoolService } from './school.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { LoggedInUserService, DataType, Operator } from '../shared/loggedInUser.service';

@Component({
  selector: 'app-school-edit',
  templateUrl: './school-edit.component.html'
})
export class SchoolEditComponent implements OnInit {

  selectedId: number;
  isLoading: boolean = false;
  school: ISchool = null;
  BoardList: any = ['ICSE', 'CBSE', 'Other'];
  CityList: any = ['Thane', 'Pune', 'Nasik'];
  StateList: any = ['Maharastra', 'West bengal', 'Gujrat'];

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private schoolService: SchoolService,
    private loggedInUserService: LoggedInUserService) {
  }

  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  editForm = this.fb.group({
    Name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    ShortName: new FormControl('', [Validators.maxLength(10)]),
    Code: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    RegisteredDate: new FormControl(Date(), [Validators.required]),
    EmailID: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    Mobile: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    Board: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    Address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    City: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    State: new FormControl('', [Validators.maxLength(20)]),
    PIN: new FormControl('', [Validators.maxLength(7)]),
    IsDeleted: new FormControl(false, []),
    ContactPerson: new FormControl('', [Validators.maxLength(50)]),
    ContactNo: new FormControl('', [Validators.maxLength(20)]),

  });

  objMaster = { ...this.school };

  ngOnInit(): void {


    this.selectedId =   this.loggedInUserService.loggedInUser.SchoolId ;//
    //   this.activatedRouter.snapshot.params.id;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadUI();
    }, 500);
  }

  loadUI(): void {
    this.isLoading = true;
    this.displayAlert.clearError();
    this.schoolService.getById(this.selectedId).subscribe({
      next: data => {
        this.school = data;
        this.objMaster = { ...this.school };
        this.populateUI(data);
      },
      error: err => { this.displayAlert.showError(err); },
      complete: () => { this.isLoading = false; }
    });
  }

  populateUI(obj: ISchool): void {
    this.editForm.patchValue(obj);
    this.editForm.patchValue({ RegisteredDate: new Date(obj.RegisteredDate) });
  }

  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/schools/create', { id: -1 }]);

    }
    else if (key == "Save") {
      this.Save();
    }
    else if (key == "Cancel") {
      this.onCancel();
    }

  }



  onCancel(): void {
    this.school = { ...this.objMaster };
    this.editForm.patchValue(this.school);
    this.editForm.reset();
  }



  Save(): void {
    if (!this.editForm.valid) {
      this.displayAlert.showError('One or more value is invalid. Please clear error to continue...');
      return;
    }
    this.modalLoader.Show();
    this.displayAlert.clearError();
    this.school = this.editForm.value;
    this.school.Id = this.objMaster.Id;
    this.school.RowVersionStr = this.objMaster.RowVersionStr;
    this.schoolService.update(this.school).subscribe({
      next: data => {
        this.displayAlert.showSuccess('Details Updated Successfully.');
        this.editForm.reset();
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }
}
