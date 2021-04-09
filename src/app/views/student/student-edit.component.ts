import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IStudent } from './student';
import { StudentService } from './student.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';

import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';
import { SelectItem } from '../shared/SelectItem';


@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html'
})
export class StudentEditComponent implements OnInit {

  selectedId: number;
  isLoading: boolean = false;
  student: IStudent = null;
  ClassCodeList: SelectItem[] ;
  GenderList: any[] = [
    { Value: 'M', Text: 'Male' }, { Value: 'F', Text: 'Female' },
    { Value: 'T', Text: 'Transgender' }
  ];
  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private loggedInUserService: LoggedInUserService) {
  }

  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  editForm = this.fb.group({
    Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    Code: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    DateOfBirth: new FormControl(Date()),
    EmailId: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    Mobile: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    Gender: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    ClassCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    SchoolCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    Address: new FormControl('', [Validators.maxLength(100)]),
    IsDeleted: new FormControl(false, []),
    Description: new FormControl('', [Validators.maxLength(100)]),

  });

  objMaster = { ...this.student };

  ngOnInit(): void {
    this.selectedId = this.activatedRouter.snapshot.params.id;
    this.editForm.patchValue({ SchoolCode: this.loggedInUserService.loggedInUser.SchoolCode });
    this.ClassCodeList = this.loggedInUserService.loggedInUser.Classes; 
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadUI();
    }, 500);
  }

  loadUI(): void {
    this.isLoading = true;
    this.displayAlert.clearError();
    this.studentService.getById(this.selectedId).subscribe({
      next: data => {
        this.student = data;
        this.objMaster = { ...this.student };
        this.populateUI(data);
      },
      error: err => { this.displayAlert.showError(err); },
      complete: () => { this.isLoading = false; }
    });
  }

  populateUI(obj: IStudent): void {
    this.editForm.patchValue(obj); 
    this.editForm.patchValue({DateOfBirth : new Date(obj.DateOfBirth)}); 
  }

  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/students/create', { id: -1 }]);

    }
    else if (key == "Save") {
      this.Save();
    }
    else if (key == "Cancel") {
      this.onCancel();
    }

  }



  onCancel(): void {
    this.student = { ...this.objMaster };
    this.editForm.patchValue(this.student);
    this.editForm.reset();
  }

  Save(): void {

    if (!this.editForm.valid) {
      this.displayAlert.showError('One or more value is invalid. Please clear error to continue...');
      return ;
    }
    this.modalLoader.Show();
    this.displayAlert.clearError();
    this.student = this.editForm.value;
    this.student.Id = this.objMaster.Id;
    this.student.RowVersionStr = this.objMaster.RowVersionStr; 
    this.studentService.create(this.student).subscribe({
      next: data => {
        this.displayAlert.showSuccess('Details Updated Successfully.');
        this.editForm.reset();   
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }
}
