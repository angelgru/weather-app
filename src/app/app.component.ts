import { Component } from '@angular/core';
import { ICurrentWeather } from './interfaces';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  current: ICurrentWeather;

  constructor(private weatherService: WeatherService) {
  }

  search(data: string): void {
    this.weatherService.getCurrentWeather(data).subscribe(data => {
      this.current =  data;
    });
  }
}
