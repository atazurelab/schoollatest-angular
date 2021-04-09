import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IDailyClassUpdate } from './dailyClassUpdate';
import { DailyClassUpdateService } from './dailyClassUpdate.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { LoggedInUserService } from '../shared/loggedInUser.service';

@Component({
  selector: 'app-dailyClassUpdate-create',
  templateUrl: './dailyClassUpdate-create.component.html'
})
export class DailyClassUpdateCreateComponent implements OnInit {

   
  selectedId: number;
  isLoading: boolean = false;

  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private dailyClassUpdateService: DailyClassUpdateService,
    private loggedInUserService: LoggedInUserService) {
  }


  dailyClassUpdate: IDailyClassUpdate = null;

  editForm = this.fb.group({
    ClassCode: new FormControl('', [Validators.required, Validators.maxLength(10),]),
    SchoolCode: new FormControl('', [Validators.required, Validators.maxLength(10),]),
    ClassWork: new FormControl('', [Validators.maxLength(100),]),
    HomeWork: new FormControl('', [Validators.maxLength(100),]),
    UpdateForDate: new FormControl(Date(), []),
    Period: new FormControl('', [Validators.maxLength(20),]),
    Subject: new FormControl('', [Validators.maxLength(20),]),
    Teacher: new FormControl('', [Validators.maxLength(50),]),
    SchoolId: new FormControl(0, []),
    ClassId: new FormControl(0, []),

  });

  objMaster = { ...this.dailyClassUpdate };

  ngOnInit(): void {

  }

  loadUI(): void {
    this.isLoading = true;
    this.displayAlert.clearError();
    this.dailyClassUpdateService.getById(this.selectedId).subscribe({
      next: data => {
        this.dailyClassUpdate = data;
        this.objMaster = { ...this.dailyClassUpdate };
        this.populateUI(data);
      },
      error: err => { this.displayAlert.showError(err); },
      complete: () => { this.isLoading = false; }
    });
  }


  populateUI(obj: IDailyClassUpdate): void {
    this.editForm.patchValue(obj);
  }


  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/dailyClassUpdates/create']);
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
    this.dailyClassUpdate = { ...this.objMaster };
    this.editForm.patchValue(this.dailyClassUpdate);
    this.editForm.reset();
  }

  Save(): void {

    if (!this.editForm.valid) {
      this.displayAlert.showError('One or more value is invalid. Please clear error to continue...');
      return;
    }


    this.modalLoader.Show();
    this.dailyClassUpdate = this.editForm.value;
    this.dailyClassUpdateService.create(this.dailyClassUpdate).subscribe({
      next: data => {
        this.displayAlert.showSuccess('Details Updated Successfully.')
        this.editForm.reset();
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }

}



