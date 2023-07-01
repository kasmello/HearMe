import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private dark = new BehaviorSubject<boolean>(true);
  currLightingMode = this.dark.asObservable();

  changeLightMode() {
    this.dark.next(!this.dark.value)
  }
}
