import { Component, OnInit } from '@angular/core';
import { Category } from '../../../model/category.model';
import { CategoryService } from '../../../service/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit {
  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private CategoryService: CategoryService
  ) {}

  id?: any;
  item = {} as Category;
  error?: any;

  ngOnInit(): void {
    if (!localStorage.getItem('authUserId')) {
      this.router.navigate(['login']);
    }

    this.id = this.ar.snapshot.paramMap.get('id');
    this.CategoryService.getCategoryById(this.id).subscribe((data) => {
      this.item = data;
    });
  }

  update(): void {
    this.CategoryService.updateCategory(this.id, this.item).subscribe(
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
