import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyService } from './currency.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  _http = inject(HttpClient);
  private API_KEY = '86c4376903aa446e9c63fc2024197506';
  private apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${this.API_KEY}`;
  amount: number = 1;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  result!: number | undefined;

  constructor(private currencyService: CurrencyService) {
    this.getLatestExchangeRates()
  }

  getLatestExchangeRates(): Observable<any> {
    return this._http.get<any>(this.apiUrl);
  }

  convertCurrency() {
    return this.getLatestExchangeRates().pipe(map((response: any) => {
      const fromRate = response.rates[this.fromCurrency];
      const toRate = response.rates[this.toCurrency];

      if (fromRate !== undefined && toRate !== undefined) {
        this.result = (this.amount / fromRate) * toRate;
      } else {
        this.result = undefined;
      }
      // amount: number, fromCurrency: string, toCurrency: string
    }));
  }
}
