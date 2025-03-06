import { Component, input, output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountServiceService } from '../_Services/account-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
constructor(private accountService: AccountServiceService) { }
  //private accountService = inject(AccountServiceService);
  private toastr = inject(ToastrService);
 
  model:any={};
  usersFromHomeComponent= input.required<any>();
  //usersFromHomeComponent:any;
  //@Output() cancelRegister = new EventEmitter();
  cancelRegister = output<boolean>();

  register(){
    this.accountService.Register(this.model).subscribe({
      next:(response:any)  => {
        console.log(response);
        this.cancel();
      },
      error: (error:any) => this.toastr.error(error.error)
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  } 

}


