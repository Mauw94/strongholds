import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';


const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'users/:id', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
