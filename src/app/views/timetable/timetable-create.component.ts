import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; 
import { ITimetable } from './timetable';
import { TimetableService } from './timetable.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service'; 

@Component({
  selector: 'app-timetable-create',
  templateUrl: './timetable-create.component.html' 
})
export class TimetableCreateComponent implements OnInit {

  checkModel: any = { left: false, middle: true, right: false };
  selectedId: number; 
  isLoading : boolean = false;
  
  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent; 
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private timetableService: TimetableService,
	private loggedInUserService :LoggedInUserService) {
  }


  timetable: ITimetable = null;

  editForm = this.fb.group({
   ClassCode: new FormControl('', [Validators.required, Validators.maxLength(10), ]),
Period: new FormControl('', [Validators.required, Validators.maxLength(20), ]),
Day: new FormControl('', [Validators.required, Validators.maxLength(20), ]),
SchoolCode: new FormControl('', [Validators.required, Validators.maxLength(10), ]),
TeacherCode: new FormControl('', [Validators.required, Validators.maxLength(20), ]),
Subject: new FormControl('', [Validators.maxLength(20), ])

  });

  objMaster = { ...this.timetable };

  ngOnInit(): void {
    
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
      this.router.navigate(['/timetables/create']);
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
    this.timetable = { ...this.objMaster };
    this.editForm.patchValue(this.timetable);
    this.editForm.reset(); 
  } 

  Save(): void {
  
   if (!this.editForm.valid) {
	  this.displayAlert.showError('One or more value is invalid. Please clear error to continue...');
	  return ;
	}
	
  
    this.modalLoader.Show();
    this.timetable = this.editForm.value; 
    this.timetableService.create(this.timetable).subscribe({
      next: data => {
	      this.editForm.reset(); 
        this.displayAlert.showSuccess('Details Updated Successfully.')
      },
      error: err => { this.displayAlert.showError(err) ;  this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  } 

}



