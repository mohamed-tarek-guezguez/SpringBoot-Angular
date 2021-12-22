import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private UserService: UserService
  ) {}

  id?: any;
  item = {} as User;
  error?: any;

  newPassword?: any;
  confirmPassword?: any;
  passworderror?: any;

  ngOnInit(): void {
    this.id = localStorage.getItem('authUserId');
    if (!this.id) {
      this.router.navigate(['login']);
    } else {
      this.UserService.getUserById(this.id).subscribe((data) => {
        this.item = data;
      });
    }
  }

  update(): void {
    this.passworderror = '';
    if (this.newPassword || this.confirmPassword) {
      if (this.newPassword === this.confirmPassword) {
        this.item.password = this.newPassword;
      } else {
        this.passworderror = 'Password do not match!';
      }
    }

    if (this.passworderror === '') {
      this.UserService.updateUser(this.id, this.item).subscribe(
        (response) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Updated Successfully',
            text: 'Your informations are updated successfully message',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (err) => {
          this.error = err.error;
          console.log(err.error);
        }
      );
    }
  }
}
