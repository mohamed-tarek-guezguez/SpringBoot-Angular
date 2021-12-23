import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private UserService: UserService) {}

  user = {} as User;
  userId: any;
  isUserAdmin: any = 'ok';
  dataLength: any;

  ngOnInit(): void {
    this.userId = localStorage.getItem('authUserId');

    if (this.userId) {
      this.UserService.getUserById(this.userId).subscribe((data) => {
        this.user = data;
      });
    }

    this.dataLength = JSON.parse(localStorage['myCart']).length;
  }

  logout(): void {
    localStorage.setItem('authUserId', '');
    window.location.reload();
  }
}
