import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountServiceService } from '../_Services/account-service.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService= inject(AccountServiceService) ;
 
  model: any= {};

  login(){
    this.accountService.Login(this.model).subscribe({
      next: (response) =>{
        console.log(response);
      },
      error: (error) => console.log(error),
      complete: () => console.log('completed')
    });
    console.log(this.model);
  }
  Logout(){
    this.accountService.LogOut();
  }
}
