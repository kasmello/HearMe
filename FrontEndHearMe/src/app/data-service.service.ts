import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  
  private hearSubject = new BehaviorSubject<number>(0);
  private centOff = new BehaviorSubject<number>(0);
  mode = null;
  currHearMode = this.hearSubject.asObservable();
  currCent = this.centOff.asObservable();
  constructor(private platform: Platform) {
    if (this.platform.ANDROID||this.platform.IOS) {
      this.mode = 'mobile';
    } else {
      this.mode = 'desktop'
    }
    console.log("MODE: " + this.mode)
  }

  changeMode() {
    this.hearSubject.next(this.hearSubject.value === 0 ? 1 : 0);
  }

  changeCent(newCent) {
    this.centOff.next(newCent);
  }

}
