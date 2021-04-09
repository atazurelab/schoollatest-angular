import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IHoliday } from './holiday';
import { HolidayService } from './holiday.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';

import { LoggedInUserService, DataType, Operator } from '../shared/loggedInUser.service';


@Component({
  selector: 'app-holiday-edit',
  templateUrl: './holiday-edit.component.html'
})
export class HolidayEditComponent implements OnInit {

  selectedId: number;
  isLoading: boolean = false;
  holiday: IHoliday = null;


  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private holidayService: HolidayService,
    private loggedInUserService: LoggedInUserService) {
  }

  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  editForm = this.fb.group({
    Name: new FormControl('', [Validators.required, Validators.maxLength(50),]),
    StartDate: new FormControl(Date(), [Validators.required]),
    EndDate: new FormControl(Date(), [Validators.required]),
    Description: new FormControl('', [Validators.required, Validators.maxLength(100),]),
    SchoolCode: new FormControl('', [Validators.required, Validators.maxLength(10),]),

  });

  objMaster = { ...this.holiday };

  ngOnInit(): void {
    this.selectedId = this.activatedRouter.snapshot.params.id;
    this.editForm.patchValue({ SchoolCode: this.loggedInUserService.loggedInUser.SchoolCode });

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadUI();
    }, 500);
  }

  loadUI(): void {
    this.isLoading = true;
    this.displayAlert.clearError();
    this.holidayService.getById(this.selectedId).subscribe({
      next: data => {
        this.holiday = data;
        this.objMaster = { ...this.holiday };
        this.populateUI(data);
      },
      error: err => { this.displayAlert.showError(err); },
      complete: () => { this.isLoading = false; }
    });
  }

  populateUI(obj: IHoliday): void {
    this.editForm.patchValue(obj);
    this.editForm.patchValue({StartDate : new Date(obj.StartDate), EndDate : new Date(obj.EndDate)});
  }

  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/holidays/create', { id: -1 }]);

    }
    else if (key == "Save") {
      this.Save();
    }
    else if (key == "Cancel") {
      this.onCancel();
    }

  }



  onCancel(): void {
    this.holiday = { ...this.objMaster };
    this.editForm.patchValue(this.holiday);
    this.editForm.reset();
  }



  Save(): void {

    if (!this.editForm.valid) {
      this.displayAlert.showError('One or more value is invalid. Please clear error to continue...');
      return;
    }

    this.modalLoader.Show();
    this.displayAlert.clearError();
    this.holiday = this.editForm.value;
    this.holiday.Id = this.objMaster.Id;
    this.holiday.RowVersionStr = this.objMaster.RowVersionStr;
    this.holidayService.update(this.holiday).subscribe({
      next: data => {
        this.displayAlert.showSuccess('Details Updated Successfully.');
        this.editForm.reset();   
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }
}
