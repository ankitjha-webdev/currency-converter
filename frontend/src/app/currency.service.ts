import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }

  convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Observable<number> {
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
