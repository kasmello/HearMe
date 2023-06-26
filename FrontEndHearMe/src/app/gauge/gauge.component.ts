import { Component } from '@angular/core';
import { ZingchartAngularModule } from 'zingchart-angular';
import zingchart from 'zingchart';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent {
  cent = 0;
  myConfig: ZingchartAngular.graphset = {
    type: "gauge",
    
  };

  
  constructor(private hearModeChange: DataServiceService) {
  }

  ngOnInit() {
    this.hearModeChange.currCent.subscribe((value: number) => {
      this.cent = value;
    });
    
  }

}
