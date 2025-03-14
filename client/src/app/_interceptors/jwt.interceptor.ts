import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountServiceService } from '../_Services/account-service.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountServiceService);
  if(accountService.currentUser()){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accountService.currentUser()?.token}`
      }
    })
  }

  return next(req);
};
