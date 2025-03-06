import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AccountServiceService } from '../_Services/account-service.service';
import { ToastrService } from 'ngx-toastr';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountServiceService);
  const toastr = inject (ToastrService);

  if(accountService.currentUser()){
    return true;
  }
  else{
    toastr.error('You shall not pass');
    return false;
  }

};
