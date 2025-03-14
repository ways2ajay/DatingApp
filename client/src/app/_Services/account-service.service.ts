import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, inject, signal } from '@angular/core';
import {User} from '../_models/User';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  private http:HttpClient = inject(HttpClient);
  baseUrl: string = environment.apiUrl;
  currentUser= signal<User|null>(null);
  constructor() { }

  Login(model: any){
    return this.http.post<User>(this.baseUrl+ 'account/login',model).pipe(
      map(user =>{
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    );
  }

  Register(model: any){
    return this.http.post<User>(this.baseUrl+ 'account/register',model).pipe(
      map(user =>{
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    );
  }

  LogOut(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
