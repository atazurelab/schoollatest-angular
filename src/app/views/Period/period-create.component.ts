import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IPeriod } from './period';
import { PeriodService } from './period.service';


import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';

@Component({
  selector: 'app-period-create',
  templateUrl: './period-create.component.html'
})
export class PeriodCreateComponent implements OnInit {

  isLoading = false;
  selectedId: number;
  period: IPeriod = null;
  //Classes : any[] = [{value:'C001', text:'V'},{value:'C002', text:'VI'}] 
  Classes:  any[];
  
  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private periodService: PeriodService,
    private loggedInUserService :LoggedInUserService
    ) {
  }


 

  editForm = this.fb.group({
    Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    ClassCode: new FormControl('', [ Validators.maxLength(20)]),
    SchoolCode: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    Description: new FormControl('', [Validators.required, Validators.maxLength(10)]),

  });

  objMaster = { ...this.period };


  ngAfterViewInit(): void {
     this.editForm.patchValue({SchoolCode: this.loggedInUserService.loggedInUser.SchoolCode});
     this.Classes = this.loggedInUserService.Classes; 
  }

  ngOnInit(): void {
     
  }


  loadUI(): void {

     
    this.isLoading = true ;
    this.displayAlert.clearError();
    this.periodService.getById(this.selectedId).subscribe({
      next: data => {
        this.period = data;
        this.objMaster = { ...this.period };
        this.populateUI(data);
      },
      error: err => { this.displayAlert.showError(err); this.isLoading = false; },
      complete: () => { this.isLoading = false; }
    });

  }


  populateUI(obj: IPeriod): void {
    this.editForm.patchValue(obj);
  }


  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/periods/create' ]);
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
    this.period = this.editForm.value;
    console.log(this.period);
    this.periodService.create(this.period).subscribe({
      next: data => {
        this.editForm.reset();
        this.displayAlert.showSuccess('Details Updated Successfully.')
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }

}



