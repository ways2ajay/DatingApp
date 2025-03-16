import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from '../_models/Member';
import { AccountServiceService } from './account-service.service';
import { of,tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  private http= inject(HttpClient);
  members= signal<Member[]>([]);

  getMember(username:string){
    const member = this.members().find(x=>x.userName === username);
    if(member!==undefined) return of(member);
    
    return this.http.get<Member>(this.baseUrl+'users/'+username);
  }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl+'users')
    .subscribe({
      next: members => this.members.set(members)
    });
  }

  updateUser(member: Member){
    return this.http.put(this.baseUrl+'users/updateUser',member).pipe(
      tap(()=> {
        this.members.update(members => members.map(
          m=>m.userName === member.userName? member:m))
      })
    );
  }


}
