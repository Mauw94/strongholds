import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { User } from 'src/types/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User
  submitted: boolean = false

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  newUser(): void {

  }

  save() {

  }

  onSubmit() {

  }

  gotoList() {

  }

}
