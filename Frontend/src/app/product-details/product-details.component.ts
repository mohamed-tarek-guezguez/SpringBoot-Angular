import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';

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
}
