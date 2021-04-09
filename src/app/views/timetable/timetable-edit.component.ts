import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ITimetable } from './timetable';
import { TimetableService } from './timetable.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';

import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';


@Component({
  selector: 'app-timetable-edit',
  templateUrl: './timetable-edit.component.html'
})
export class TimetableEditComponent implements OnInit {

  selectedId: number;
  isLoading: boolean = false;
  timetable: ITimetable = null;


  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private timetableService: TimetableService,
    private loggedInUserService: LoggedInUserService) {
  }

  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  editForm = this.fb.group({
    ClassCode: new FormControl('', [Validators.required, Validators.maxLength(10),]),
    Period: new FormControl('', [Validators.required, Validators.maxLength(20),]),
    Day: new FormControl('', [Validators.required, Validators.maxLength(20),]),
    SchoolCode: new FormControl('', [Validators.required, Validators.maxLength(10),]),
    TeacherCode: new FormControl('', [Validators.required, Validators.maxLength(20),]),
    Subject: new FormControl('', [Validators.maxLength(20),])

  });

  objMaster = { ...this.timetable };

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
    this.timetableService.getById(this.selectedId).subscribe({
      next: data => {
        this.timetable = data;
        this.objMaster = { ...this.timetable };
        this.populateUI(data);
      },
      error: err => { this.displayAlert.showError(err); },
      complete: () => { this.isLoading = false; }
    });
  }

  populateUI(obj: ITimetable): void {
    this.editForm.patchValue(obj);
  }

  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/timetables/create', { id: -1 }]);

    }
    else if (key == "Save") {
      this.Save();
    }
    else if (key == "Cancel") {
      this.onCancel();
    }

  }



  onCancel(): void {
    this.timetable = { ...this.objMaster };
    this.editForm.patchValue(this.timetable);
    this.editForm.reset();
  }



  Save(): void {

    if (!this.editForm.valid) {
      this.displayAlert.showError('One or more value is invalid. Please clear error to continue...');
      return;
    }

    this.modalLoader.Show();
    this.displayAlert.clearError();
    this.timetable = this.editForm.value;
    this.timetable.Id = this.objMaster.Id;
    this.timetable.RowVersionStr = this.objMaster.RowVersionStr;
    this.timetableService.update(this.timetable).subscribe({
      next: data => {
        this.displayAlert.showSuccess('Details Updated Successfully.');
        this.editForm.reset();   
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }
}
