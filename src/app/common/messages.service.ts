import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  constructor() { }

  getErrorMessage(res: any): string {
    return '';
  }

}
