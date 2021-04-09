import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder  } from '@angular/forms'; 
import { ISubscription } from './subscription';
import { SubscriptionService } from './subscription.service';

import { DisplayAlertComponent } from '../shared/display-alert.component';
import { ModalLoaderComponent } from '../shared/modal-loader.component';
import { LoggedInUserService} from '../shared/loggedInUser.service';

@Component({
  selector: 'app-subscription-view',
  templateUrl: './subscription-view.component.html'
})
export class SubscriptionViewComponent implements OnInit {

 
  isLoading: boolean = false; 
  @ViewChild(DisplayAlertComponent) displayAlert: DisplayAlertComponent;

  constructor(
    private fb: FormBuilder, 
    private subscriptionService: SubscriptionService,
    private loggedInUserService: LoggedInUserService) {
  }


  subscription: ISubscription = null; 

  editForm = this.fb.group({
    
  });

  objMaster = { ...this.subscription };

  ngOnInit(): void {
    setTimeout(() => {
      this.loadUI();
    }, 500);
  }

  loadUI(): void {
    this.isLoading = true;
    this.displayAlert.clearError();
    this.subscriptionService.getBySchoolId(this.loggedInUserService.School.Id).subscribe({
      next: data => {
        console.log(data);
        this.subscription = data.subscription;  
        this.populateUI(data);
      },
      error: err => { this.displayAlert.showError(err); },
      complete: () => { this.isLoading = false; }
    });
  }


  populateUI(obj: ISubscription): void {
    this.editForm.patchValue(obj);
  }


  onOptionItemClicked(key: string): void {
    if (key == "Create") {
      //this.router.navigate(['/subscriptions/create']);
    }
    else if (key == "Save") {
     
    }
    else if (key == "Cancel") {
     
    }
    else if (key == "Refresh") {
      this.loadUI();
    }
  }
 
   

}



