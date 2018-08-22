import { Injectable } from '@angular/core';
import { IWeatherService } from './i-weather-service';
import { Observable } from '../../node_modules/rxjs';
import { ICurrentWeather } from './interfaces';
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'
import { map } from 'rxjs/operators';

interface ICurrentWeatherData {
  weather: [{
    description: string,
    icon: string
  }],
  main: {
    temp: number
  },
  sys: {
    country: string
  },
  dt: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements IWeatherService {

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather(search: string): Observable<ICurrentWeather> {
    return this.httpClient.get<ICurrentWeatherData>(
      `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
      `q=${search}&appid=${environment.appId}`
    ).pipe(map(data => {
      return this.transformToICurrentWeather(data);
    }))
  }

  transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image : `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: data.main.temp,
      description: data.weather[0].description
    };
  }
}
