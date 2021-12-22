import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  constructor(private router: Router, private UserService: UserService) {}

  item = {} as User;
  error?: any;
  password2?: any;
  confirmerror?: any;

  ngOnInit(): void {
    if (!localStorage.getItem('authUserId')) {
      this.router.navigate(['login']);
    }

    this.item.role = 'user';
  }

  add(): void {
    if (this.item.password !== this.password2) {
      this.confirmerror = ['Password do not match!'];
    } else {
      this.UserService.addUser(this.item).subscribe(
        (response) => {
          this.router.navigate(['admin/user']);
        },
        (err) => {
          this.error = err.error;
        }
      );
    }
  }
}
