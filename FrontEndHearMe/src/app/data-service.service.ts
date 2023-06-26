import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private hearSubject = new BehaviorSubject<number>(0);
  private centOff = new BehaviorSubject<number>(0);
  currHearMode = this.hearSubject.asObservable();
  currCent = this.centOff.asObservable();

  changeMode() {
    this.hearSubject.next(this.hearSubject.value === 0 ? 1 : 0);
  }

  changeCent(newCent) {
    this.centOff.next(newCent);
  }

}
