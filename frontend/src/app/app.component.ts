import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyService } from './currency.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  API_KEY = '86c4376903aa446e9c63fc2024197506';
  url = 'https://openexchangerates.org/api/latest.json'
  amount: number = 1;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  result!: number | undefined;
  
  constructor(private currencyService: CurrencyService){
    this.getLatestCurrency()
  }

  getLatestCurrency(){
    this._http.get(`${this.url}?app_id=${this.API_KEY}`).subscribe({
      next(value:any) {
        console.log(value);
        // Iterate this object
      },
      error(err) {
        console.log(err);
      },
    })
  }

  convertCurrency() {
    this.currencyService
      .convertCurrency(this.amount, this.fromCurrency, this.toCurrency)
      .subscribe((conversionResult) => {
        this.result = conversionResult;
      });
  }
}
