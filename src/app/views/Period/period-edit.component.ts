import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IPeriod } from './period';
import { PeriodService } from './period.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';
@Component({
  selector: 'app-period-edit',
  templateUrl: './period-edit.component.html'
})
export class PeriodEditComponent implements OnInit {

  selectedId: number;
  isLoading: boolean = false;
  period: IPeriod = null;
  Classes: any[] = ['V', 'VI', 'VII'];

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private periodService: PeriodService,
    private loggedInUserService :LoggedInUserService) {
  }
  
  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  editForm = this.fb.group({
    Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    ClassCode: new FormControl('', [ Validators.maxLength(20)]),
    SchoolCode: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    Description: new FormControl('', [Validators.required, Validators.maxLength(10)]),
 
  });

  objMaster = { ...this.period };

  ngOnInit(): void {
    this.selectedId = this.activatedRouter.snapshot.params.id;
    this.editForm.patchValue({SchoolCode: this.loggedInUserService.loggedInUser.SchoolCode});
    this.Classes = this.loggedInUserService.loggedInUser.Classes; 
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadUI();
    }, 500); 
  }

  loadUI(): void {
    this.isLoading = true;
    this.displayAlert.clearError();
    this.periodService.getById(this.selectedId).subscribe({
      next: data => {
        this.period = data;
        this.objMaster = { ...this.period };
        this.populateUI(data);
      },
      error: err => { this.displayAlert.showError(err); },
      complete: () => { this.isLoading = false; }
    }); 
  } 

  populateUI(obj: IPeriod): void {
    this.editForm.patchValue(obj);
  } 

  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/periods/create', { id: -1 }]);

    }
    else if (key == "Save") {
      this.Save();
    }
    else if (key == "Cancel") {
      this.onCancel();
    }

  }



  onCancel(): void {
    this.period = { ...this.objMaster };
    this.editForm.patchValue(this.period);
    this.editForm.reset();
  }



  Save(): void {
    if (!this.editForm.valid) {
      this.displayAlert.showError('One or more value is invalid. Please clear error to continue...');
      return ;
    }
    this.modalLoader.Show();
    this.displayAlert.clearError();
    this.period = this.editForm.value;
    this.period.Id = this.objMaster.Id;
    this.period.RowVersionStr = this.objMaster.RowVersionStr;  
    this.periodService.update(this.period).subscribe({
      next: data => {
        this.displayAlert.showSuccess('Details Updated Successfully.');
        this.editForm.reset();   
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }

}
