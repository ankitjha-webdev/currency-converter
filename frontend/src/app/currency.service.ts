import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
  standalone: true,
  imports:[
    HttpClientModule
  ]
})
export class CurrencyService {
  private http: inject(HttpClient)
  private API_KEY = '86c4376903aa446e9c63fc2024197506';
  private apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${this.API_KEY}`;
  private exchangeRates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.80,
    // Add more currencies and rates as needed
  };

  constructor() { }

  convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Observable<number | undefined> {
    const fromRate = this.exchangeRates[fromCurrency];
    const toRate = this.exchangeRates[toCurrency];

    if (fromRate !== undefined && toRate !== undefined) {
      const result = (amount / fromRate) * toRate;
      return of(result);
    } else {
      return of(undefined);
    }
  }
}
