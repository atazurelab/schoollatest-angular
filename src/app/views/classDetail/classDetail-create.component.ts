import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; 
 import { IClassDetail } from './classDetail';
import { ClassDetailService } from './classDetail.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';
import { SelectItem } from '../shared/SelectItem';

@Component({
  selector: 'app-classDetail-create',
  templateUrl: './classDetail-create.component.html' 
})
export class ClassDetailCreateComponent implements OnInit {

   
  selectedId: number; 
  isLoading : boolean = false;

  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent; 
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private classDetailService: ClassDetailService,
    private loggedInUserService :LoggedInUserService) {
  }

  TeacherList : SelectItem[];
  classDetail: IClassDetail = null;

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
    this.TeacherList =this.loggedInUserService.Teachers ;
    this.editForm.patchValue({SchoolCode: this.loggedInUserService.loggedInUser.SchoolCode});
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
    else if (key == "Refresh") {
      this.loadUI();
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
      return ;
    }

    this.modalLoader.Show();
    this.classDetail = this.editForm.value; 
    this.classDetail.ClassTeacherId = parseInt(this.editForm.value.ClassTeacherId);
    this.classDetailService.create(this.classDetail).subscribe({
      next: data => {
	    this.editForm.reset(); 
        this.displayAlert.showSuccess('Details Updated Successfully.')
      },
      error: err => { this.displayAlert.showError(err) ;  this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  } 

}



