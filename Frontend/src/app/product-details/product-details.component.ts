import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private ar: ActivatedRoute,
    private ProductService: ProductService
  ) {}

  productID: any;
  productData: any;
  imgUrl = 'http://localhost:8080/api/book/getImage/';

  ngOnInit(): void {
    this.productID = this.ar.paramMap.subscribe((params) => {
      this.productID = this.ar.snapshot.paramMap.get('id');

      this.ProductService.getProductById(this.productID).subscribe((data) => {
        this.productData = data;
      });
    });
  }

  addToCart(data: any): void {
    var myCart = JSON.parse(localStorage['myCart']);

    var exists = false;
    for (let i = 0; i < myCart.length; i++) {
      if (myCart[i].id === data.id) {
        exists = true;
      }
    }

    if (exists) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Item Already Exists In Cart!',
      });
    } else {
      myCart.push(data);
      localStorage['myCart'] = JSON.stringify(myCart);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Item Added Successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
