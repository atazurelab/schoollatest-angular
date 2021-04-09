import { Component, OnInit, ViewChild } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { DashboardService } from './dashboard.component.service';
import { LoggedInUserService, DataType, Operator } from '../shared/loggedInUser.service';
import { SelectItem } from '../shared/SelectItem';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  lstMain: any[];
  isLoading: boolean;
  @ViewChild(ModalLoaderComponent) modalLoader: ModalLoaderComponent;
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  constructor(
    private dashboardService: DashboardService,
    private loggedInUserService: LoggedInUserService
  ) { }


  ngOnInit(): void {
    // generate random values for mainChart
    setTimeout(() => {  //<<<---using ()=> syntax 
      this.getDashboardData();
    }, 500);


  }
 

  getDashboardData(): void {
    this.displayAlert.clearError();
    this.dashboardService.getDashboardData().subscribe({
      next: data => {
        this.lstMain = data.DashboardData;
      },
      error: err => { this.lstMain = []; this.displayAlert.showError(err); this.isLoading = false; },
      complete: () => { this.isLoading = false; }
    });
  }

}
