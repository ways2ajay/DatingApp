import { Component, inject} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-test-errors',
  imports: [  ],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
  httpClient = inject(HttpClient);
  validationErrors: string[] = [];

  get400Error() {
    this.httpClient.get('https://localhost:5001/api/buggy/bad-request').subscribe({
      next: response =>  console.log(response), 
      error: error => console.log(error)
    });
  }

  get401Error() {
    this.httpClient.get('https://localhost:5001/api/buggy/auth').subscribe({
      next: response =>  console.log(response), 
      error: error => console.log(error)
    });
  }

  get404Error() {
    this.httpClient.get('https://localhost:5001/api/buggy/not-found').subscribe({
      next: response =>  console.log(response), 
      error: error => console.log(error)
    });
  }
  
  get500Error() {
    this.httpClient.get('https://localhost:5001/api/buggy/server-error').subscribe({
      next: response =>  console.log(response), 
      error: error => console.log(error)
    });
  }

  get400ValidationError() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.httpClient.post('https://localhost:5001/api/account/register',
      '{}',
      { headers }).subscribe({
      next: response =>  console.log(response), 
      error: error => {
        console.log(error);
        this.validationErrors=error;
      }
    });
  }

}
