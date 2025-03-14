import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_Services/members.service';
import { Member } from '../../_models/Member';
import { MemberCardComponent } from "../../members/member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{
  
  ngOnInit(): void {
    this.getMembers();
  }
  http = inject(HttpClient);
  private memberService = inject(MembersService);
   members: Member[] = [];

  getMembers(){
    this.memberService.getUsers().subscribe({
      next: members => this.members = members
    });
  }
  
}
