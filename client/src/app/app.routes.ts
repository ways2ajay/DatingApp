import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './memebers/member-list/member-list.component';
import { MemberDetailComponent } from './memebers/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuardGuard } from './_guards/auth-guard.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

export const routes: Routes = [
    {path:'', component: HomeComponent, title:'Home'},
    {
        path:'',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuardGuard],
        children:[
            {path:'members', component: MemberListComponent, title:'Members', canActivate:[authGuardGuard]},
            {path:'member/:username', component: MemberDetailComponent, title:'Member Detail'},
            {path:'lists', component: ListsComponent, title:'Lists'},
            {path:'messages', component: MessagesComponent, title:'Messages'}
        ]
    },
    {path:'errors', component: TestErrorsComponent, title:'Errors'},
    {path:'not-found', component: NotFoundComponent, title:'Not Found'},
    {path:'server-error', component: ServerErrorComponent, title:'Server Error'},
    {path:'**', pathMatch:'full', component: HomeComponent, title:'Home'}
];
