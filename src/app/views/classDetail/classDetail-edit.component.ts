import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IClassDetail } from './classDetail';
import { ClassDetailService } from './classDetail.service';
import { SelectItem } from '../shared/SelectItem';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { LoggedInUserService, DataType, Operator } from '../shared/loggedInUser.service';

@Component({
  selector: 'app-classDetail-edit',
  templateUrl: './classDetail-edit.component.html'
})
export class ClassDetailEditComponent implements OnInit {

  selectedId: number;
  isLoading: boolean = false;
  classDetail: IClassDetail = null;
  TeacherList: SelectItem[];

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private classDetailService: ClassDetailService,
    private loggedInUserService: LoggedInUserService) {
  }

  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  editForm = this.fb.group({
    Name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    Code: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    SchoolCode: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    IsDeleted: new FormControl(false, []),
    Description: new FormControl('', [Validators.maxLength(100)]),
    ClassTeacherId: new FormControl(0, []),

  });

  objMaster = { ...this.classDetail };

  ngOnInit(): void {
    this.selectedId = this.activatedRouter.snapshot.params.id;
    this.editForm.patchValue({ SchoolCode: this.loggedInUserService.loggedInUser.SchoolCode });
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.TeacherList = this.loggedInUserService.Teachers;
      this.loadUI();
    }, 500);
  }

  loadUI(): void {
    this.isLoading = true;
    this.displayAlert.clearError();
    this.classDetailService.getById(this.selectedId).subscribe({
      next: data => {
        this.classDetail = data;
        this.objMaster = { ...this.classDetail };
        this.populateUI(data);
      },
      error: err => { this.displayAlert.showError(err); },
      complete: () => { this.isLoading = false; }
    });
  }

  populateUI(obj: IClassDetail): void {
    this.editForm.patchValue(obj);
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

  }



  onCancel(): void {
    this.classDetail = { ...this.objMaster };
    this.editForm.patchValue(this.classDetail);
    this.editForm.reset();
  }



  Save(): void {
    if (!this.editForm.valid) {
      this.displayAlert.showError('One or more value is invalid. Please clear error to continue...');
      return;
    }
    this.modalLoader.Show();
    this.displayAlert.clearError();
    console.log(this.editForm.value);
    this.classDetail = this.editForm.value;
    this.classDetail.ClassTeacherId = parseInt(this.editForm.value.ClassTeacherId);
    this.classDetail.Id = this.objMaster.Id;
    this.classDetail.RowVersionStr = this.objMaster.RowVersionStr; 
    this.classDetailService.update(this.classDetail).subscribe({
      next: data => {
        this.displayAlert.showSuccess('Details Updated Successfully.');
        this.editForm.reset();
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }
}
