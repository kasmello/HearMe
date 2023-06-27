import { Component } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import * as PlotlyJS from 'plotly.js-dist-min';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent {
  cent = 0;
  visibility?: boolean;
  prevVisibility?: boolean;
  graph = {
    data: [
      {
        type: "indicator",
        mode: "gauge+number",
        value: 0,
        title: { text: "Cents Off", font: { size: 24 }, color: "grey"},
        gauge: {
          axis: { range: [-50, 50], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "green"},
          bgcolor: 'rgba(0,0,0,0)',
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [-50, -10], color: "red" },
            { range: [-10, 10], color: "green" },
            { range: [10, 50], color: "red" }
          ],
          threshold: [
            {line: { color: "red", width: 4 },
              thickness: 0.75,
              value: -10
            },
            {line: { color: "red", width: 4 },
              thickness: 0.75,
              value: 10
            },
        ]
        }
      }
    ],
    layout: {width: 600, 
      height: 500, 
      plot_bgcolor: "rgba(0, 0, 0, 0)", 
      paper_bgcolor: "rgba(0, 0, 0, 0)",
    font: { color: "green", family: "Courier New" }}
  };
  

  
  constructor(private hearModeChange: DataServiceService) {
    this.prevVisibility = false;
  }

  ngOnInit() {
    this.hearModeChange.currCent.subscribe((value: number) => {
      if (this.cent!=value) {
        this.cent = value
        this.graph = {
          data: [
            {
              type: "indicator",
              mode: "gauge+number",
              value: value,
              title: { text: "Cents off", font: { size: 24 }, color: "grey"},
              gauge: {
                axis: { range: [-50, 50], tickwidth: 1, tickcolor: "darkblue" },
                bar: { color: value<-10 || value >10?"red":"green"},
                bgcolor: 'rgba(0,0,0,0)',
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                  { range: [-50, -10], color: "grey" },
                  { range: [-10, 10], color: "yellow" },
                  { range: [10, 50], color: "grey" }
                ],
                threshold: [
                  {line: { color: "red", width: 4 },
                    thickness: 0.75,
                    value: -10
                  },
                  {line: { color: "red", width: 4 },
                    thickness: 0.75,
                    value: 10
                  },
              ]
              }
            }
          ],
          layout: {width: 600, 
            height: 500, 
            plot_bgcolor: "rgba(0, 0, 0, 0)", 
            paper_bgcolor: "rgba(0, 0, 0, 0)",
            font: { color: value<-10||value>10?"red":"green", family: "Courier New" }}
        }
      }
    });


    this.hearModeChange.currHearMode.subscribe((value: number) => {
      this.visibility = value===1?true:false;
    });
    
  }

}
