import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../shared/base.service';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggedInUserService, DataType,Operator } from '../shared/loggedInUser.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public progress: number;
  public message: string;
  public filenames :string[] = [];
  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(private http: HttpClient, private loggedInUserService : LoggedInUserService ,  private baseService: BaseService) { }
  ngOnInit() {
  }
  
  public uploadFileSingle = (files) => {
    if (files.length === 0) {
      return;
    }
    
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    const token = localStorage.getItem("jwt"); 
    
    const myheaders = new HttpHeaders ({'Authorization': `Bearer ${token}`}); 
 
    this.http.post('https://localhost:44311/api/Upload?path='+ `${this.loggedInUserService.loggedInUser.Code}` , formData,  { reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.filenames.push(fileToUpload.name);
          this.onUploadFinished.emit(event.body);
        }
      });
  }



   public uploadFile = (files) => {
    if (files.length === 0) {
       return;
     }

     let filesToUpload : File[] = files;
    const formData = new FormData();
    
     Array.from(filesToUpload).map((file, index) => {
      this.filenames.push(file.name);
      return formData.append('file'+index, file, file.name);
     });
     const headers = this.baseService.getHeaders();



     this.http.post('https://localhost:44311/api/upload', formData, {   headers:headers,  reportProgress: true, observe: 'events'})
     .pipe(
      // tap(data => console.log('All: ' + JSON.stringify(data.Records))),
      catchError(this.baseService.handleError) 
      )

       .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
      
           this.progress = Math.round(100 * event.loaded / event.total);
         else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.'; 
           this.onUploadFinished.emit(event.body);
         }
       });
   } 
}
