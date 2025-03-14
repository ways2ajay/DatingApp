import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../_models/Member';
import { AccountServiceService } from './account-service.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  private http= inject(HttpClient);

  getUser(username:string){
    return this.http.get<Member>(this.baseUrl+'users/'+username);
  }

  getUsers(){
    return this.http.get<Member[]>(this.baseUrl+'users');
  }



}
