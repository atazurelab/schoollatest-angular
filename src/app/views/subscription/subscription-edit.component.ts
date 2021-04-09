import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ISubscription } from './subscription';
import { SubscriptionService } from './subscription.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';

import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';


@Component({
  selector: 'app-subscription-edit',
  templateUrl: './subscription-edit.component.html'
})
export class SubscriptionEditComponent implements OnInit {

  selectedId: number;
  isLoading: boolean = false;
  subscription: ISubscription = null;
  StatusList : any[] = [ "Active", "Expired"  ];
  SchoolList : any[] ;
  PlanList : any[] ;

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private subscriptionService: SubscriptionService,
    private loggedInUserService: LoggedInUserService) {
  }

  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  editForm = this.fb.group({
    PlanId: new FormControl(0, [Validators.required]),
    SchoolId: new FormControl(0, [Validators.required]),
    StartDate: new FormControl(Date(), [Validators.required]),
    EndDate: new FormControl(Date(), [Validators.required]),
    Status: new FormControl('', [Validators.required, Validators.maxLength(20),]),
    Description: new FormControl('', [Validators.maxLength(20),])

  });

  objMaster = { ...this.subscription };

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
    this.subscriptionService.getBySchoolId(this.selectedId).subscribe({
      next: data => { 
        this.subscription = data.subscription;
        this.PlanList = data.PlanList;
        this.SchoolList = data.SchoolList;
        this.objMaster = { ...this.subscription };
        this.populateUI(this.subscription);
      },
      error: err => { this.displayAlert.showError(err); },
      complete: () => { this.isLoading = false; }
    });
  }

  populateUI(obj: ISubscription): void {
    this.editForm.patchValue(obj);
    this.editForm.patchValue({StartDate : new Date(obj.StartDate), EndDate : new Date(obj.EndDate)});
  }

  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/subscriptions/create', { id: -1 }]);

    }
    else if (key == "Save") {
      this.Save();
    }
    else if (key == "Cancel") {
      this.onCancel();
    }

  }



  onCancel(): void {
    this.subscription = { ...this.objMaster };
    this.editForm.patchValue(this.subscription);
    this.editForm.reset();
  }



  Save(): void {

    if (!this.editForm.valid) {
      this.displayAlert.showError('One or more value is invalid. Please clear error to continue...');
      return;
    }

    this.modalLoader.Show();
    this.displayAlert.clearError();
    this.subscription = this.editForm.value;
    this.subscription.Id = this.objMaster.Id;
    this.subscription.PlanId = parseInt(this.editForm.value.PlanId);
    //this.subscription.SchoolId = parseInt(this.editForm.value.SchoolId); 
    let school = this.SchoolList.filter(s => s.Id.toString()  === this.editForm.value.SchoolId)[0];
    this.subscription.SchoolCode = school.Value ;
    this.subscription.SchoolId = school.Id;
    this.subscription.RowVersionStr = this.objMaster.RowVersionStr;
    this.subscriptionService.update(this.subscription).subscribe({
      next: data => {
        this.displayAlert.showSuccess('Details Updated Successfully.');
        this.editForm.reset();   
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }
}
