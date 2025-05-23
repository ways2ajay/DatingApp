import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavComponent } from "./nav/nav.component";
import { AccountServiceService } from './_Services/account-service.service';
import { NgxSpinnerComponent } from 'ngx-spinner';
//import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, NavComponent, NgxSpinnerComponent]
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  
  private accountService = inject(AccountServiceService);

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const currentUser = JSON.parse(userString);
    this.accountService.currentUser.set(currentUser);
  }
} 
