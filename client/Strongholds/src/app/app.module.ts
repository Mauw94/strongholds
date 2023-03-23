import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    AddUserComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
