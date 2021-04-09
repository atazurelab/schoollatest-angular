 import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
 




@Component({
  selector: 'app-toolbar-list',
  templateUrl: './toolbar-list.component.html',
  styleUrls: ['./toolbar-list.component.css']
})
export class ToolbarListComponent implements OnInit {

  constructor(private _location : Location,  private router: Router ) { }

  @Input() form : any;
@Input() Entity : string;
@Input() buttons : any[] = [];

  @Output() 
  onItemClicked : EventEmitter<string> = new EventEmitter<string>();    
 
  onButtonClicked(event : string) :void {  
       if (event == 'Create'){
        //this.myModal.hide();
       // this.modalRef = this.modalService.show(this.modal);
       this.router.navigate(['/students/create']);
       }
       else  if (event == 'Back'){
        this._location.back();
       }
       console.log(event);
        this.onItemClicked.emit(event);
    }

  ngOnInit(): void {
  }


}
