import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';

import { ProductService } from '../service/product.service';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private ProductService: ProductService,
    private CategoryService: CategoryService
  ) {}

  products?: Product[];
  categorys?: Category[];
  totalPages?: any;
  currentPage: any = 0;

  imgUrl = 'http://localhost:8080/api/book/getImage/';

  Load() {
    this.ProductService.getProductsPagin(this.currentPage).subscribe((data) => {
      this.products = data.content;
      this.totalPages = data.totalPages;
      this.currentPage = data.number;

      this.CategoryService.getCategorys().subscribe((data) => {
        this.categorys = data;
      });
    });
  }

  ngOnInit(): void {
    this.Load();
  }

  searchText?: string = '';

  Search() {
    if (this.searchText === '') {
      this.Load();
    } else {
      this.ProductService.getProductsByKeyword(this.searchText).subscribe(
        (data) => {
          this.products = data;
        }
      );
    }
  }

  categoryText?: string = 'all';

  filter(keyword: any) {
    if (keyword === 'all') {
      this.categoryText = 'all';
      this.Load();
    } else {
      this.ProductService.getProductsByCategory(keyword).subscribe((data) => {
        this.products = data;
        this.categoryText = keyword;
      });
    }
  }

  isEmpty() {
    if (this.products?.length == 0) {
      return true;
    }
    return false;
  }

  Prev() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.Load();
    }
  }

  Next() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.Load();
    }
  }

  GoPage(i: any) {
    this.currentPage = i;
    this.Load();
  }
}
