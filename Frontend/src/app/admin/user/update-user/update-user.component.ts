import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private UserService: UserService
  ) {}

  id?: any;
  item = {} as User;
  error?: any;

  ngOnInit(): void {
    if (!localStorage.getItem('authUserId')) {
      this.router.navigate(['login']);
    }

    this.id = this.ar.snapshot.paramMap.get('id');
    this.UserService.getUserById(this.id).subscribe((data) => {
      this.item = data;
    });
  }

  update(): void {
    this.UserService.updateUser(this.id, this.item).subscribe(
      (response) => {
        this.router.navigate(['admin/user']);
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    );
  }
}
