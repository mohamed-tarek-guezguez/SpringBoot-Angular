import { Component, OnInit } from '@angular/core';
import { Category } from '../../../model/category.model';
import { CategoryService } from '../../../service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  constructor(
    private router: Router,
    private CategoryService: CategoryService
  ) {}

  item = {} as Category;
  error?: any;

  ngOnInit(): void {}

  add(): void {
    if (!localStorage.getItem('authUserId')) {
      this.router.navigate(['login']);
    }

    this.CategoryService.addCategory(this.item).subscribe(
      (response) => {
        this.router.navigate(['admin/category']);
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    );
  }
}
