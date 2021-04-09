import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; 
import { IHoliday } from './holiday';
import { HolidayService } from './holiday.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service'; 

@Component({
  selector: 'app-holiday-create',
  templateUrl: './holiday-create.component.html' 
})
export class HolidayCreateComponent implements OnInit {

  checkModel: any = { left: false, middle: true, right: false };
  selectedId: number; 
  isLoading : boolean = false;
  
  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent; 
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private holidayService: HolidayService,
	private loggedInUserService :LoggedInUserService) {
  }


  holiday: IHoliday = null;

  editForm = this.fb.group({
   Name: new FormControl('', [Validators.required, Validators.maxLength(50), ]),
StartDate: new FormControl(Date(), [Validators.required]),
EndDate: new FormControl(Date(), [Validators.required]),
Description: new FormControl('', [Validators.required, Validators.maxLength(100), ]),
SchoolCode: new FormControl('', [Validators.required, Validators.maxLength(10), ]),

  });

  objMaster = { ...this.holiday };

  ngOnInit(): void {
    this.editForm.patchValue({SchoolCode: this.loggedInUserService.loggedInUser.SchoolCode});
   
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
  }

 
  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/holidays/create']);
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
    this.holiday = { ...this.objMaster };
    this.editForm.patchValue(this.holiday);
    this.editForm.reset(); 
  } 

  Save(): void {
  
   if (!this.editForm.valid) {
	  this.displayAlert.showError('One or more value is invalid. Please clear error to continue...');
	  return ;
	}
	
  
    this.modalLoader.Show();
    this.holiday = this.editForm.value; 
    this.holidayService.create(this.holiday).subscribe({
      next: data => {
	    
      this.displayAlert.showSuccess('Details Updated Successfully.');
      this.editForm.reset();   
      },
      error: err => { this.displayAlert.showError(err) ;  this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  } 

}



