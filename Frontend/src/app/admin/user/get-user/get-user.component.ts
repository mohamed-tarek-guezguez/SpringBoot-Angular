import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { UserService } from '../../../service/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css'],
})
export class GetUserComponent implements OnInit {
  constructor(private router: Router, private service: UserService) {}

  users?: User[];
  searchText?: string = '';

  ngOnInit(): void {
    if (!localStorage.getItem('authUserId')) {
      this.router.navigate(['login']);
    }

    this.service.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  Search() {
    this.service.getUsersByKeyword(this.searchText).subscribe((data) => {
      this.users = data;
    });
  }

  isEmpty() {
    if (this.users?.length == 0) {
      return true;
    }
    return false;
  }

  Remove(item: User) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteUser(item.id).subscribe((response) => {
          this.service.getUsers().subscribe((data) => {
            this.users = data;
          });
        });
      }
    });
  }
}
