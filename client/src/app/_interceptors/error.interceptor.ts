import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
const toastr = inject(ToastrService);
const router = inject(Router);

  return next(req).pipe(
    catchError(error =>{
      if(error){
         switch (error.status) {
          case 400:
            if(error.error.errors){
              const modalStateError =[];
              for(const key in error.error.errors){
                if(error.error.errors[key]){
                  modalStateError.push(error.error.errors[key]);
                }
              }
              throw modalStateError.flat();
            }
            else{
                toastr.error(error.error, error.status);
            }
            break;
            case 401:
              toastr.error('Unauthorised', error.status);
              break;
            case 404:
              router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras ={state:{error: error.error}};
              router.navigateByUrl('/server-error',navigationExtras);
              break;
          default:
            toastr.error('Something unexpected went wrong');
            break;
         }
      }
      throw error;
    })
  );
};
