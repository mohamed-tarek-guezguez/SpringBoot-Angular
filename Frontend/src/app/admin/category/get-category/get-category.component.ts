import { Component, OnInit } from '@angular/core';
import { Category } from '../../../model/category.model';
import { CategoryService } from '../../../service/category.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-category',
  templateUrl: './get-category.component.html',
  styleUrls: ['./get-category.component.css'],
})
export class GetCategoryComponent implements OnInit {
  constructor(private service: CategoryService, private router: Router) {}

  categorys?: Category[];
  searchText?: string = '';

  ngOnInit(): void {
    if (!localStorage.getItem('authUserId')) {
      this.router.navigate(['login']);
    }

    this.service.getCategorys().subscribe((data) => {
      this.categorys = data;
    });
  }

  Search() {
    this.service.getCategorysByKeyword(this.searchText).subscribe((data) => {
      this.categorys = data;
    });
  }

  isEmpty() {
    if (this.categorys?.length == 0) {
      return true;
    }
    return false;
  }

  Remove(item: Category) {
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
        this.service.deleteCategory(item.id).subscribe((response) => {
          this.service.getCategorys().subscribe((data) => {
            this.categorys = data;
          });
        });
      }
    });
  }
}
