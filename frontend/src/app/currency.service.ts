import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  // private http: inject(HttpClient)
  private API_KEY = '86c4376903aa446e9c63fc2024197506';
  private apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${this.API_KEY}`;
  private exchangeRates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.80,
    // Add more currencies and rates as needed
  };

  constructor() { }

  // getLatestExchangeRates(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }

  // convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Observable<number | undefined> {
  //   return this.getLatestExchangeRates().pipe(map((response:any) => {
  //     const fromRate = response.rates[fromCurrency];
  //     const toRate = response.rates[toCurrency];

  //     if (fromRate !== undefined && toRate !== undefined) {
  //       return (amount / fromRate) * toRate;
  //     } else {
  //       return undefined;
  //     }
  //   }));
  // }
}
