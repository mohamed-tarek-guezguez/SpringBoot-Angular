import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { ProductService } from '../../service/product.service';
import { UserService } from '../../service/user.service';
import { ContactService } from '../../service/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private CategoryService: CategoryService,
    private ContactService: ContactService,
    private ProductService: ProductService,
    private UserService: UserService,
    private router: Router
  ) {}

  category_count = 0;
  product_count = 0;
  user_count = 0;
  contact_count = 0;

  ngOnInit(): void {
    if (!localStorage.getItem('authUserId')) {
      this.router.navigate(['login']);
    } else {
      this.UserService.getUserById(
        localStorage.getItem('authUserId')
      ).subscribe((data) => {
        if (data.role !== 'admin') {
          this.router.navigate(['profile']);
        }
      });
    }

    this.CategoryService.getCategorys().subscribe((data) => {
      this.category_count = data.length;
    });

    this.ProductService.getProducts().subscribe((data) => {
      this.product_count = data.length;
    });

    this.UserService.getUsers().subscribe((data) => {
      this.user_count = data.length;
    });

    this.ContactService.getContacts().subscribe((data) => {
      this.contact_count = data.length;
    });
  }
}
