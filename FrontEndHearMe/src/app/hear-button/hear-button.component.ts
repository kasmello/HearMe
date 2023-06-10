import { Component } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-hear-button',
  templateUrl: './hear-button.component.html',
  styleUrls: ['./hear-button.component.css']
})
export class HearButtonComponent {
  
  i: number;
  hearArr: string[];

  constructor(private hearModeChange: DataServiceService) {
    this.hearArr = ["Click to start hearing", "Click to stop hearing"];
    this.i = 0

  }

  activateHearing() {
    this.hearModeChange.changeMode();
  }

  ngOnInit() {
    
    this.hearModeChange.currHearMode.subscribe((value: number) => {
      this.i = value
    })
  }
}
