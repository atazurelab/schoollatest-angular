import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IFeeDetail } from './feeDetail';
import { FeeDetailService } from './feeDetail.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';

import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';


@Component({
  selector: 'app-feeDetail-edit',
  templateUrl: './feeDetail-edit.component.html'
})
export class FeeDetailEditComponent implements OnInit {

  selectedId: number;
  isLoading: boolean = false;
  feeDetail: IFeeDetail = null;
  StatusList: any[] = ['Pending', 'Completed', 'Rejected'];

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private feeDetailService: FeeDetailService,
	private loggedInUserService :LoggedInUserService) {
  }
  
  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  editForm = this.fb.group({
    Amount: new FormControl(0, [Validators.required]),
DueDate: new FormControl(Date(), [Validators.required]),
Status: new FormControl('', [Validators.required, Validators.maxLength(20), ]),
StudentCode: new FormControl('', [Validators.required, Validators.maxLength(20), ]),
Description: new FormControl('', [Validators.maxLength(100), ]),
ReferenceNo: new FormControl('', [Validators.maxLength(20), ]),
StudentId: new FormControl(0, [Validators.required]),
 
  });

  objMaster = { ...this.feeDetail };

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
    this.feeDetailService.getById(this.selectedId).subscribe({
      next: data => {
        this.feeDetail = data;
        this.objMaster = { ...this.feeDetail };
        this.populateUI(data);
      },
      error: err => { this.displayAlert.showError(err); },
      complete: () => { this.isLoading = false; }
    }); 
  } 

  populateUI(obj: IFeeDetail): void {
    this.editForm.patchValue(obj);
    console.log('dto', obj);
    console.log('form value',this.editForm.value);
  } 

  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/feeDetails/create' ]);

    }
    else if (key == "Save") {
      this.Save();
    }
    else if (key == "Cancel") {
      this.onCancel();
    }

  }



  onCancel(): void {
    this.feeDetail = { ...this.objMaster };
    this.editForm.patchValue(this.feeDetail);
    this.editForm.reset();
  }



  Save(): void {
  
  if (!this.editForm.valid) {
	  this.displayAlert.showError('One or more value is invalid. Please clear error to continue...');
	  return ;
	}
  
    this.modalLoader.Show();
    this.displayAlert.clearError();
    this.feeDetail = this.editForm.value;
  	this.feeDetail.Id =  this.objMaster.Id;
	 this.feeDetail.RowVersionStr = this.objMaster.RowVersionStr;  
    this.feeDetailService.update(this.feeDetail).subscribe({
      next: data => {
        this.displayAlert.showSuccess('Details Updated Successfully.');
        this.editForm.reset();   
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }
}
