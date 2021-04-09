 
// Angular
  import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'; 


import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert'; 
  

import { ToolbarDetailsComponent } from '../shared/toolbar-details.component';
import { ToolbarListComponent } from '../shared/toolbar-list.component';
import { DisplayAlertComponent } from '../shared/display-alert.component'; 
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { YesNoPipe } from '../shared/yes-no.pipe';   
import { UploadComponent } from '../shared/upload.component';   


@NgModule({
  declarations: [ 
    ModalLoaderComponent,
    DisplayAlertComponent, 
    ToolbarDetailsComponent,
    ToolbarListComponent,
    UploadComponent,
    YesNoPipe
  ],
  exports : [
    ModalLoaderComponent,
    DisplayAlertComponent, 
    ToolbarDetailsComponent,
    ToolbarListComponent,
    YesNoPipe,
    UploadComponent],
  imports: [ 

    CommonModule ,   
    FormsModule,     
   
    ReactiveFormsModule, 
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
 
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
