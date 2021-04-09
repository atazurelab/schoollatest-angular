import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IPlan } from './plan';
import { PlanService } from './plan.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';

import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';


@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.component.html'
})
export class PlanEditComponent implements OnInit {

  selectedId: number;
  isLoading: boolean = false;
  plan: IPlan = null;
  PaymentFrequencyList: any[] = ["Monthly", "Quarterly", "HalfYearly", "Annual"];
  PlanTypeList: any[] = ["Trail", "Paid"];

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private planService: PlanService,
    private loggedInUserService: LoggedInUserService) {
  }

  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  editForm = this.fb.group({
    Name: new FormControl('', [Validators.required, Validators.maxLength(20),]),
    StudentLimit: new FormControl(0, []),
    StaffLimit: new FormControl(0, [Validators.required]),
    Amount: new FormControl(0, [Validators.required]),
    IsDeleted: new FormControl(false, [Validators.required]),
    PlanType: new FormControl('', [Validators.maxLength(20)]),
    PaymentFrequency: new FormControl('', [Validators.required, Validators.maxLength(20),]),
    FrequencyAmount: new FormControl(0, []),
    Description: new FormControl('', [Validators.maxLength(100),])

  });

  objMaster = { ...this.plan };

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
    this.planService.getById(this.selectedId).subscribe({
      next: data => {
        this.plan = data;
        this.objMaster = { ...this.plan };
        this.populateUI(data);
      },
      error: err => { this.displayAlert.showError(err); },
      complete: () => { this.isLoading = false; }
    });
  }

  populateUI(obj: IPlan): void {
    this.editForm.patchValue(obj);
  }

  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/plans/create', { id: -1 }]);

    }
    else if (key == "Save") {
      this.Save();
    }
    else if (key == "Cancel") {
      this.onCancel();
    }

  }



  onCancel(): void {
    this.plan = { ...this.objMaster };
    this.editForm.patchValue(this.plan);
    this.editForm.reset();
  }



  Save(): void {

    if (!this.editForm.valid) {
      this.displayAlert.showError('One or more value is invalid. Please clear error to continue...');
      return;
    }

    this.modalLoader.Show();
    this.displayAlert.clearError();
    this.plan = this.editForm.value;
    this.plan.Id = this.objMaster.Id;

    this.plan.StaffLimit = parseInt(this.editForm.value.StaffLimit);
    this.plan.StudentLimit = parseInt(this.editForm.value.StudentLimit);
    this.plan.StudentLimit = parseInt(this.editForm.value.StudentLimit);
    this.plan.Amount = parseInt(this.editForm.value.Amount);
    this.plan.FrequencyAmount = parseInt(this.editForm.value.FrequencyAmount);
    this.plan.RowVersionStr = this.objMaster.RowVersionStr;

    this.planService.update(this.plan).subscribe({
      next: data => { 
        this.displayAlert.showSuccess('Details Updated Successfully.')
        this.editForm.reset();
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }
}
