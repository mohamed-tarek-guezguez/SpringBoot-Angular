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

  imgUrl = 'http://localhost:8080/api/book/getImage/';

  ngOnInit(): void {
    if (!localStorage.getItem('authUserId')) {
      this.router.navigate(['login']);
    }

    this.service.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  Search() {
    this.service.getProductsByKeyword(this.searchText).subscribe((data) => {
      this.products = data;
    });
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
}
