import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { NgForm } from '@angular/forms';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
  if(component.editForm && component.editForm.dirty){
    return confirm('There are unsaved changes. Are you sure to continue, all unsaved changes will be lost.');
  }
  
  return true;
};
