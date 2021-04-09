import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { INoticeBoard } from './noticeBoard';
import { NoticeBoardService } from './noticeBoard.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';

import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';


@Component({
  selector: 'app-noticeBoard-edit',
  templateUrl: './noticeBoard-edit.component.html'
})
export class NoticeBoardEditComponent implements OnInit {

  selectedId: number;
  isLoading: boolean = false;
  noticeBoard: INoticeBoard = null;
  

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private noticeBoardService: NoticeBoardService,
	private loggedInUserService :LoggedInUserService) {
  }
  
  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  editForm = this.fb.group({
    Subject: new FormControl('', [Validators.required, Validators.maxLength(50), ]),
Notice: new FormControl('', [Validators.required, Validators.maxLength(2000), ]),
 
  });

  objMaster = { ...this.noticeBoard };

  ngOnInit(): void {
    this.selectedId = this.activatedRouter.snapshot.params.id;
    this.editForm.patchValue({SchoolCode: this.loggedInUserService.loggedInUser.SchoolCode});
   
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadUI();
    }, 500); 
  }

  loadUI(): void {
    this.isLoading = true;
    this.displayAlert.clearError();
    this.noticeBoardService.getById(this.selectedId).subscribe({
      next: data => {
        this.noticeBoard = data;
        this.objMaster = { ...this.noticeBoard };
        this.populateUI(data);
      },
      error: err => { this.displayAlert.showError(err); },
      complete: () => { this.isLoading = false; }
    }); 
  } 

  populateUI(obj: INoticeBoard): void {
    this.editForm.patchValue(obj);
  } 

  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      this.router.navigate(['/noticeBoards/create', { id: -1 }]);

    }
    else if (key == "Save") {
      this.Save();
    }
    else if (key == "Cancel") {
      this.onCancel();
    }

  }



  onCancel(): void {
    this.noticeBoard = { ...this.objMaster };
    this.editForm.patchValue(this.noticeBoard);
    this.editForm.reset();
  }



  Save(): void {
  
  if (!this.editForm.valid) {
	  this.displayAlert.showError('One or more value is invalid. Please clear error to continue...');
	  return ;
	}
  
    this.modalLoader.Show();
    this.displayAlert.clearError();
    this.noticeBoard = this.editForm.value;
	this.noticeBoard.Id = this.objMaster.Id;
	this.noticeBoard.RowVersionStr = this.objMaster.RowVersionStr;  
    this.noticeBoardService.update(this.noticeBoard).subscribe({
      next: data => {
        this.displayAlert.showSuccess('Details Updated Successfully.');
        this.editForm.reset();   
      },
      error: err => { this.displayAlert.showError(err); this.modalLoader.Close() },
      complete: () => { this.modalLoader.Close() }
    });
  }
}
