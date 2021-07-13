import { Component, OnInit } from '@angular/core';

import { EChartsOption } from 'echarts';
import {LineChart } from 'echarts/charts';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  chartOption: EChartsOption;
  
  constructor() { }
  onChartInit(ec) {
    console.log(ec);
    
  
  }
  
  ngOnInit(): void {
    this.chartOption = {
      tooltip: {
        show: true // include tooltip component for the feature
    },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
        },
      ],
    };
      
  }
}
