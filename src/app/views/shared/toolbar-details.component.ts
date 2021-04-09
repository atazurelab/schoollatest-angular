import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-toolbar-details',
  templateUrl: './toolbar-details.component.html',
  styleUrls: ['./toolbar-details.component.css']
})
export class ToolbarDetailsComponent implements OnInit {



  @ViewChild('myModal', { static: false }) myModal: any;

  //  @ViewChild('template', { static: false }) modal : any;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private _location: Location) { }

  /* openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

 */
  confirmMessage: string;
  messageStyle: string;
  curAction: string
  confirmButtonText : string ;

  @Input() form: any;
  @Input() Entity: string;
  @Input() buttons : any[] = [];



  @Output()
  onItemClicked: EventEmitter<string> = new EventEmitter<string>();

  onButtonClicked(event: string): void {
    if (event == 'Save') {
      this.myModal.hide();
    }
    else if (event == 'Delete') {
      this.myModal.hide();
    }
    else if (event == 'Cancel') {
      this.myModal.hide();
    }
    else if (event == 'Back') {
      this.myModal.hide();
      this._location.back();
    }
    else {
      console.log(event);
    }
    
    this.onItemClicked.emit(event);
  }

  ngOnInit(): void {


  }

  confirmSave(): void {
    this.confirmButtonText = 'Save Changes';
    this.curAction = 'Save';

    if (this.Entity != null) {
      this.confirmMessage = `Do you want to save changes in ${this.Entity}`;
    }
    else {
      this.confirmMessage = `Do you want to save changes?`;
    }
   
    this.messageStyle = '-info';
    this.myModal.show();
  }

  confirmDelete(): void {
    this.curAction = 'Delete';
   this.confirmButtonText = 'Delete';


    if (this.Entity != null) {
      this.confirmMessage = `Delete selected ${this.Entity}?`;
    }
    else {
      this.confirmMessage = `Delete selected item?`;
    }   
    this.messageStyle = '-danger';
    this.myModal.show();
  }

  confirmBack(): void {
    this.curAction = 'Back';
    this.confirmButtonText = 'Back';

    if (this.form.dirty) {
      if (this.Entity != null) {
        this.confirmMessage = `Discard changes to ${this.Entity} and move back?`;
      }
      else {
        this.confirmMessage = `Discrad changes and move back?`;
      }
      this.messageStyle = '-warning';
      this.myModal.show();
    }
    else {
      this.onButtonClicked(this.curAction);
    }

  }


  confirmCancel(): void {
    this.curAction = 'Cancel';
    this.confirmButtonText = 'Cancel Changes';
    if (this.form.dirty) {
      if (this.Entity != null) {
        this.confirmMessage = `Discard changes to ${this.Entity}?`;
      }
      else {
        this.confirmMessage = `Discard changes?`;
      }
      this.curAction = 'Cancel';
      this.messageStyle = '-secondary';
      this.myModal.show();
    }
    else {
      this.onButtonClicked(this.curAction);
    }
  }




}
