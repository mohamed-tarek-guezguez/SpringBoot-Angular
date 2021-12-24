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
  dataLength: any;

  ngOnInit(): void {
    this.userId = localStorage.getItem('authUserId');

    if (this.userId) {
      this.UserService.getUserById(this.userId).subscribe((data) => {
        this.user = data;
      });
    }

    this.dataLength = JSON.parse(localStorage['myCart']).length;

    setTimeout(() => {
      this.ngOnInit();
    }, 1000 * 10);
  }

  logout(): void {
    localStorage.setItem('authUserId', '');
    window.location.reload();
  }
}
