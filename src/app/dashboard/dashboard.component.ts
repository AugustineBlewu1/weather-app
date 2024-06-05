import {
  ChartDataType,
  ForecastData,
  LocationData,
  WeatherData,
} from './../../constants/types';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { HttpService } from '../http.service';
import { error } from 'console';
import { format, getHours } from "date-fns";
import { CapitalizeFirstPipe } from '../capitalize-first.pipe';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CanvasJSAngularChartsModule, CommonModule, CapitalizeFirstPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  getLocation = signal<LocationData | undefined>(undefined);
  weatherData = signal<WeatherData | undefined>(undefined);
  forecastData = signal<ForecastData[] | undefined>([]);
  modeofDay = signal<string>("");
  backgroundOfDay = signal<string>("");



  dateFormat(date: string, formatData: string){
    // this.getModeofDay(date)
    return format( date === "" ? Date.now() : Date.parse(date), formatData)
  }

 

  //Chart options for table 1

 

  getModeofDay(){
    var hours = getHours(this.weatherData()?.current?.time === undefined ? Date.now() : Date.parse(this.weatherData()?.current.time ?? ""))
    var message = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening'
    var backgroundofday = hours < 12 ? 'bg-top-bottom' : hours < 18 ? 'bg-right-bottom' : 'bg-top'
    this.modeofDay.set(message);
    this.backgroundOfDay.set(backgroundofday)

    console.log(this.backgroundOfDay())
  }

  constructor(private httpservice: HttpService) {}

  ngOnInit(): void {
   this.initilizeWeatherData()


  }

  //this section initializes the weather data 

  initilizeWeatherData(){
     this.httpservice
      .get('location/search/mumbai', {
        lang: 'en',
        country: 'in',
      })
      .subscribe({
        next: (e: any) => {
          this.getLocation.set(e['locations'][0]);
          this.getWeatherData(e['locations'][0]?.id);
          this.getForecastData(e['locations'][0]?.id);
          console.log(e);
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          console.log(this.getLocation);
        },
      });
  }

  //get weather data
  getWeatherData(locationId: number) {
    this.httpservice
      .get(`current/${locationId}`, {
        alt: '0',
        tempunit: 'C',
        windunit: 'MS',
        tz: 'Europe/London',
        lang: 'en',
      })
      .subscribe({
        next: (e: any) => {
          console.log(e);
          this.weatherData.set(e)
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          this.getModeofDay()
          console.log(this.getLocation);
        },
      });
  }

  //get weather data
  getForecastData(locationId: number) {
    this.httpservice
      .get(`forecast/hourly/${locationId}`, {
        alt: '0',
        tempunit: 'C',
        windunit: 'MS',
        tz: 'Europe/London',
        periods: '7',
        dataset: 'full',
        history: 'false'
      })
      .subscribe({
        next: (e: any) => {
          console.log(e);
          this.forecastData.set(e?.forecast)
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          this.getModeofDay()
          console.log(this.getLocation);
        },
      });
  }

  dps = signal<ChartDataType[]>([
    { x: 1, y: 10 },
    { x: 2, y: 13 },
    { x: 3, y: 18 },
    { x: 4, y: 20 },
    { x: 5, y: 17 },
    { x: 6, y: 10 },
    { x: 7, y: 13 },
    { x: 8, y: 18 },
    { x: 9, y: 20 },
    { x: 10, y: 17 },
  ]);
  chart: any;

  chartOptions = {
    exportEnabled: true,
    title: {
      text: 'Hourly Forcast',
      dockInsidePlotArea: false,
      horizontalAlign: 'left',
      fontSize: 40,
      fontWeight: 'semi-bold',
      padding: {
        top: 1,
        right: 1,
        bottom: 20,
        left: 2,
      },
    },
    axisY: {
      valueFormatString: "#,###.##'°C'",
    },
    data: [
      {
        type: 'line',
        dataPoints: this.dps(),
        yValueFormatString: "'%'",
      },
    ],
  };
  getChartInstance(chart: object) {
    this.chart = chart;
    setTimeout(this.updateChart, 1000); //Chart updated every 1 second
  }
  updateChart = () => {
    var yVal =
      this.dps()[this.dps().length - 1].y +
      Math.round(5 + Math.random() * (-5 - 5));
    this.dps().push({ x: this.dps()[this.dps().length - 1].x + 1, y: yVal });

    if (this.dps.length > 10) {
      this.dps().shift();
    }
    this.chart.render();
    setTimeout(this.updateChart, 1000); //Chart updated every 1 second
  };

  chartOptionsBarChart = {
    animationEnabled: true,
    title: {
      text: 'Monthly rainfull',
      dockInsidePlotArea: false,
      horizontalAlign: 'left',
      fontWeight: 'semi-bold',
      fontSize: 20,
      padding: {
        bottom: 10,
      },
    },
    axisX: {
      labelAngle: -90,
    },

    toolTip: {
      shared: true,
    },
    legend: {
      cursor: 'pointer',
      itemclick: function (e: any) {
        if (
          typeof e.dataSeries.visible === 'undefined' ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      },
    },
    data: [
      {
        type: 'column',

        legendText: 'Degree Celcius',
        showInLegend: true,
        dataPoints: [
          { label: 'Saudi', y: 262 },
          { label: 'Venezuela', y: 211 },
          { label: 'Canada', y: 175 },
          { label: 'Iran', y: 137 },
          { label: 'Iraq', y: 115 },
          { label: 'Kuwait', y: 104 },
          { label: 'UAE', y: 97.8 },
          { label: 'Russia', y: 60 },
          { label: 'US', y: 23.3 },
          { label: 'China', y: 20.4 },
        ],
      },
      {
        type: 'column',
        legendText: 'Degree Farenheit',
        axisYType: 'secondary',
        showInLegend: true,
        dataPoints: [
          { label: 'Saudi', y: 11.15 },
          { label: 'Venezuela', y: 2.5 },
          { label: 'Canada', y: 3.6 },
          { label: 'Iran', y: 4.2 },
          { label: 'Iraq', y: 2.6 },
          { label: 'Kuwait', y: 2.7 },
          { label: 'UAE', y: 3.1 },
          { label: 'Russia', y: 10.23 },
          { label: 'US', y: 10.3 },
          { label: 'China', y: 4.3 },
        ],
      },
    ],
  };
}
