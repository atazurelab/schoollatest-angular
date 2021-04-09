import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-alert',
  templateUrl: './display-alert.component.html',
  styleUrls: ['./display-alert.component.css'] 
})
export class DisplayAlertComponent implements OnInit {

  constructor() { }

 _alerts: any[] = [];
 
  get alerts(): any[] {
      return this._alerts;
  }
  set alerts(value: any[]) {
       this._alerts = value; 
  }

 

  ngOnInit(): void {

  }


  clearError(): void {
    this.alerts = [];
     
   }
 

  
  showError(strmsg :string): void {
   this.alerts =  [];
   this.alerts.push({ type: 'danger', msg: strmsg }); 
  
  }

 
  showSuccess(strmsg :string): void {
   this.alerts = [];
   this.alerts.push({ type: 'success', msg: strmsg });  
  }


  onClosedAlert(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

}
