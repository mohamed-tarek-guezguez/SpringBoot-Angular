import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product.model';
import { Category } from '../../../model/category.model';
import { ProductService } from '../../../service/product.service';
import { CategoryService } from '../../../service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor(
    private router: Router,
    private ProductService: ProductService,
    private CategoryService: CategoryService
  ) {}

  item = {} as Product;
  error?: any;
  categorys?: Category[];
  categoryId?: any;
  languageVal?: any = 'English';
  imageFile?: any;

  onChange(event: any) {
    this.imageFile = event.target.files[0];
    this.item.image = this.imageFile.name;
  }

  ngOnInit(): void {
    if (!localStorage.getItem('authUserId')) {
      this.router.navigate(['login']);
    }

    this.item.pages = 0;
    this.item.year = new Date().getFullYear();
    this.CategoryService.getCategorys().subscribe((data) => {
      this.categorys = data;
    });
  }

  onChangeCategory($event: any) {
    this.CategoryService.getCategoryById(this.categoryId).subscribe((data) => {
      this.item.category = data;
    });
  }

  add(): void {
    this.item.language = this.languageVal;

    this.ProductService.addProduct(this.item).subscribe(
      (response) => {
        this.ProductService.upload(this.imageFile).subscribe(
          (response) => {
            this.router.navigate(['admin/product']);
          },
          (err) => {
            this.error = err.error;
            console.log(err.error);
          }
        );
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    );
  }
}
