import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: any;
  httpClient =  inject(HttpClient);

  ngOnInit(): void {
    this.httpClient.get('https://localhost:5001/api/users').subscribe({
    next: (response: any) => this.users = response,
    error: (error:any) => console.log(error),
    complete: () => console.log('completed')
  });
  }
} 
