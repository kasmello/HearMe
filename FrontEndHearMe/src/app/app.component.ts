import { Component } from '@angular/core';
import { DataServiceService } from './data-service.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Sing your heart out - in tune!'
  mode = null;
  constructor (private titleService: Title, private hearMeMode: DataServiceService) {
    this.titleService.setTitle('Sing your heart out - in tune!');
    this.mode = hearMeMode.mode
  }
  
}
