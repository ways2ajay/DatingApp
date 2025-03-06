import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountServiceService } from '../_Services/account-service.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe }  from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, BsDropdownModule,RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService= inject(AccountServiceService) ;
 private router = inject(Router);
 private toastr = inject(ToastrService);
  model: any= {};

  login(){
    this.accountService.Login(this.model).subscribe({
      next: (response) =>{
        this.router.navigateByUrl('/members');
      },
      error: (error) => this.toastr.error(error.error),
      complete: () => console.log('completed')
    });
    console.log(this.model);
  }
  Logout(){
    this.accountService.LogOut();
    this.router.navigateByUrl('/');
  }
}
