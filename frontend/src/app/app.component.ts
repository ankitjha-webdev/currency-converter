import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyService } from './currency.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  _http = inject(HttpClient);
  private API_KEY = '86c4376903aa446e9c63fc2024197506';
  private apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${this.API_KEY}`;
  amount: number = 100;
  fromCurrency: string = 'GBP';
  toCurrency: string = 'USD';
  result: any;
  exchanges: any;
  exchangeRates: any;
  currentTimeInUK = new Date().toLocaleTimeString('en-GB', {
    timeZone: 'Europe/London',
    hour12: true,
  });

  constructor(private currencyService: CurrencyService) {
    this.getLatestExchangeRates();
  }

  getLatestExchangeRates(): void {
    this._http.get<any>(this.apiUrl).subscribe({
      next: (response: any) => {
        this.exchanges = response;
        this.exchangeRates = Object.keys(this.exchanges.rates).map(
          (currency) => ({
            currency: currency,
            rate: this.exchanges.rates[currency],
          })
        );
        this.convertCurrency();
      },
      error(err) {
        console.log(err);
      },
    });
  }

  convertCurrency() {
    console.log(this.exchanges);
    console.log(
      this.fromCurrency,
      this.toCurrency,
      'this.fromCurrency | this.fromCurrency',
      this.exchanges.rates
    );

    const fromRate = this.exchanges.rates[this.fromCurrency];
    const toRate = this.exchanges.rates[this.toCurrency];

    if (fromRate && toRate) {
      this.result = ((this.amount / fromRate) * toRate).toFixed(2);
    } else {
      console.log(this.result, 'dsfdghfg999999999');

      this.result = undefined;
    }
    // amount: number, fromCurrency: string, toCurrency: string
  }
}
