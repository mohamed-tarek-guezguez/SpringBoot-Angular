import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product.model';
import { ProductService } from '../../../service/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.css'],
})
export class GetProductComponent implements OnInit {
  constructor(private router: Router, private service: ProductService) {}

  products?: Product[];
  searchText?: string = '';
  isLoading?: boolean = true;
  totalPages?: any;
  currentPage: any = 0;
  totalPagesSearch?: any;
  currentPageSearch?: any = 0;

  imgUrl = 'http://localhost:8080/api/book/getImage/';

  Load() {
    this.service.getProductsPagin(this.currentPage).subscribe((data) => {
      this.products = data.content;
      this.totalPages = data.totalPages;
      this.currentPage = data.number;

      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    });
  }

  LoadSearch() {
    this.service
      .getProductsByKeyword(this.searchText, this.currentPageSearch)
      .subscribe((data) => {
        this.products = data.content;
        this.totalPagesSearch = data.totalPages;
        this.currentPageSearch = data.number;
      });
  }

  ngOnInit(): void {
    if (!localStorage.getItem('authUserId')) {
      this.router.navigate(['login']);
    }

    this.Load();
  }

  Search() {
    if (this.searchText === '') {
      this.Load();
    } else {
      this.LoadSearch();
    }
  }

  isEmpty() {
    if (this.products?.length == 0) {
      return true;
    }
    return false;
  }

  Remove(item: Product) {
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
        this.service.deleteProduct(item.id).subscribe((response) => {
          this.service.getProducts().subscribe((data) => {
            this.products = data;
          });
        });
      }
    });
  }

  Prev() {
    if (this.searchText === '') {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.Load();
      }
    } else {
      if (this.currentPageSearch > 0) {
        this.currentPageSearch--;
        this.LoadSearch();
      }
    }
  }

  Next() {
    if (this.searchText === '') {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
        this.Load();
      }
    } else {
      if (this.currentPageSearch < this.totalPagesSearch - 1) {
        this.currentPageSearch++;
        this.LoadSearch();
      }
    }
  }

  GoPage(i: any) {
    if (this.searchText === '') {
      this.currentPage = i;
      this.Load();
    } else {
      this.currentPageSearch = i;
      this.LoadSearch();
    }
  }
}
