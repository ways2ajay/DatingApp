import { Component, inject} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-test-errors',
  imports: [  ],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
  httpClient = inject(HttpClient);
  validationErrors: string[] = [];
  baseUrl = environment.apiUrl;

  get400Error() {
    this.httpClient.get(this.baseUrl+ 'buggy/bad-request').subscribe({
      next: response =>  console.log(response), 
      error: error => console.log(error)
    });
  }

  get401Error() {
    this.httpClient.get(this.baseUrl+'buggy/auth').subscribe({
      next: response =>  console.log(response), 
      error: error => console.log(error)
    });
  }

  get404Error() {
    this.httpClient.get(this.baseUrl+'buggy/not-found').subscribe({
      next: response =>  console.log(response), 
      error: error => console.log(error)
    });
  }
  
  get500Error() {
    this.httpClient.get(this.baseUrl+'buggy/server-error').subscribe({
      next: response =>  console.log(response), 
      error: error => console.log(error)
    });
  }

  get400ValidationError() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.httpClient.post(this.baseUrl+'account/register',
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
