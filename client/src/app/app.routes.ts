import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuardGuard } from './_guards/auth-guard.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { createLinkedSignal } from '@angular/core/primitives/signals';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

export const routes: Routes = [
    {path:'', component: HomeComponent, title:'Home'},
    {
        path:'',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuardGuard],
        children:[
            {path:'members', component: MemberListComponent, title:'Members'},
            {path:'members/:username', component: MemberDetailComponent, title:'Member Detail'},
            {path:'member/edit', component: MemberEditComponent,
                canDeactivate:[preventUnsavedChangesGuard], title:'Edit Profile'},
            {path:'lists', component: ListsComponent, title:'Lists'},
            {path:'messages', component: MessagesComponent, title:'Messages'}
        ]
    },
    {path:'errors', component: TestErrorsComponent, title:'Errors'},
    {path:'not-found', component: NotFoundComponent, title:'Not Found'},
    {path:'server-error', component: ServerErrorComponent, title:'Server Error'},
    {path:'**', component: HomeComponent, pathMatch:'full'}
];
