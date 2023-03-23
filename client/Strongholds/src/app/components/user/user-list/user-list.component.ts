import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { User } from 'src/types/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      res.forEach((user: User) => {
        this.users.push(user)
      })
    })
  }

  deleteUser(id: number) {

  }

  userDetails(id: number) {

  }
}
