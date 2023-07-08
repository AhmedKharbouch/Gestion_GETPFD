import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AnalyticsService} from "../../services/analytics.service";
import {HttpClient} from "@angular/common/http";
import * as Chart from 'chart.js';

@Component({
  selector: 'app-kafka-streams',
  templateUrl: './kafka-streams.component.html',
  styleUrls: ['./kafka-streams.component.css']
})
export class KafkaStreamsComponent implements OnInit {


  title = 'chartDemo';
  constructor() {
  }

  ngOnInit() {
    var ctx = document.getElementById('myChart') as HTMLCanvasElement;
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Data1',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor:"#0196FD",
          borderColor: "#0196FD",
          borderWidth: 1
        },
          {
            label: 'Data2',
            data: [19, 12, 5, 3, 1, 6],
            backgroundColor:"orange",
            borderColor: "orange",
            borderWidth: 1
          }]
      },
      options: {
        scales: {
  yAxes: [{
    ticks: {
      beginAtZero: true
    }
  }],

        }
      }
    });

  }

}
