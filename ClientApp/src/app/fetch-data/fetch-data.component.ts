import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface WeatherForecast {
  date: Date;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast')
      .pipe(map(response => (response as any[]).map(x => {
        x.date = new Date(x.date);
        return x;
      })))
      .subscribe(result => {
        this.forecasts = <WeatherForecast[]> result;
      }, error => console.error(error));
  }
}
