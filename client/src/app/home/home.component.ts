import { Component, OnInit, inject } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  users: any;
  ngOnInit(): void {
    this.getUsers();
  }
  httpClient = inject(HttpClient);
  
  registerMode = false;

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }

  private getUsers(){
    this.httpClient.get('https://localhost:5001/api/users').subscribe({
      next: (response: any) => this.users = response,
      error: (error:any) => console.log(error),
      complete: () => console.log('completed')
    });
  }
}
