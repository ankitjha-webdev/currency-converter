import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  _http = inject(HttpClient);
  API_KEY = '86c4376903aa446e9c63fc2024197506';
  url = 'https://openexchangerates.org/api/latest.json'

  
  constructor(){
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
}
