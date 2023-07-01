import { Component } from '@angular/core';
import { DataServiceService } from './data-service.service';
import { DarkModeService } from './dark-mode.service';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'FrontEndHearMe'
  mode = null;
  dark = null;
  constructor (private titleService: Title, private hearMeMode: DataServiceService, private lightMode: DarkModeService) {
    this.titleService.setTitle('🎤Sing your heart out - in tune!');
    this.mode = hearMeMode.mode
  }

  ngOnInit() {
    this.lightMode.currLightingMode.subscribe((value) => {
      this.dark = value;
    });
  }

  switchMode() {
    this.lightMode.changeLightMode();
    console.log(`switched mode to ${this.dark}`)
  }
  
}
