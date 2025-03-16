import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/Member';
import { AccountServiceService } from '../../_Services/account-service.service';
import { MembersService } from '../../_Services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  imports: [TabsModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit{
  @ViewChild('editForm') editForm? : NgForm;
   member?:Member ;
   private accounService = inject(AccountServiceService);
   private memberService = inject(MembersService);
   private toastr = inject(ToastrService);
   
   @HostListener('window:beforeunload',['$event']) notify($event:any){
    if(this.editForm?.dirty)
      $event.returnValue= true;
   }

   ngOnInit(): void {
     this.loadMember();
   }
   
   loadMember(){
    const user = this.accounService.currentUser;
    if(!user) return;

      const userName = user()?.userName;
      if (!userName) return;
      this.memberService.getMember(userName).subscribe({
        next: member => this.member = member
      })
   }

   updateProfile(){
    this.memberService.updateUser(this.editForm?.value).subscribe({
      next: _=>{
        console.log(this.member);
        this.toastr.success("Profile saved successfully.");
        this.editForm?.resetForm(this.member);
      }
    });
   }
   
}
