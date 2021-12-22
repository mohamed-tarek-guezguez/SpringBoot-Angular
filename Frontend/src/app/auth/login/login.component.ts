import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private UserService: UserService) {}

  item = {} as User;
  globalError?: any;

  ngOnInit(): void {
    this.item.id = 0;
    this.item.username = 'login';
    this.item.role = 'login';

    if (localStorage.getItem('authUserId')) {
      this.router.navigate(['profile']);
    }
  }

  login(): void {
    this.globalError = '';
    this.UserService.login(this.item).subscribe(
      (response) => {
        if (response) {
          localStorage.setItem('authUserId', '' + response.id);
          window.location.reload();
          this.router.navigate(['profile']);
        } else {
          this.globalError = 'Incorrect email or password!';
        }
      },
      (err) => {
        this.globalError = 'Incorrect email or password!';
        console.log(err);
      }
    );
  }
}
