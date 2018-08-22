import { ICurrentWeather } from "./interfaces";
import { Observable } from 'rxjs';

export interface IWeatherService {
    getCurrentWeather(search: string): Observable<ICurrentWeather>;
}
