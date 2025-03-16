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
  memberService = inject(MembersService);
  // members: Member[] = [];
  // http = inject(HttpClient);

  ngOnInit(): void {
    if(this.memberService.members().length === 0) this.getMembers();
  }
  
  getMembers(){
    this.memberService.getMembers();
  }
  
}
