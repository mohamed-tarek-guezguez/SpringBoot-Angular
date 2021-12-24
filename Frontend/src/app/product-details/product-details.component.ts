import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { RatingService } from '../service/rating.service';
import { UserService } from '../service/user.service';
import { Rating } from '../model/rating.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private ProductService: ProductService,
    private RatingService: RatingService,
    private UserService: UserService
  ) {}

  productID: any;
  productData: any;
  ratings?: Rating[];
  commentsLength: any;

  item = {} as Rating;
  user: any;

  imgUrl = 'http://localhost:8080/api/book/getImage/';

  ngOnInit(): void {
    this.item.rate = 1;
    this.productID = this.ar.snapshot.paramMap.get('id');

    this.ProductService.getProductById(this.productID).subscribe((data) => {
      this.productData = data;
    });

    this.RatingService.getRatingsByBook(this.productID).subscribe((data) => {
      this.ratings = data;
      this.commentsLength = data.length;
    });

    if (localStorage.getItem('authUserId')) {
      this.UserService.getUserById(
        localStorage.getItem('authUserId')
      ).subscribe((data) => {
        this.user = data;
      });
    }
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

  submit() {
    if (!this.item.message) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Message cannot be empty!',
      });
    } else {
      this.item.book = this.productData;
      this.item.user = this.user;

      this.RatingService.addRating(this.item).subscribe((data) => {
        this.RatingService.getRatingsByBook(this.productID).subscribe(
          (data) => {
            this.ratings = data;
            this.commentsLength = data.length;

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your comment has been successfully submitted',
              showConfirmButton: false,
              timer: 1500,
            });

            this.item.rate = 1;
            this.item.message = '';
          }
        );
      });
    }
  }

  removeComment(itemToRemove: any) {
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
        this.RatingService.deleteRating(itemToRemove.id).subscribe((data) => {
          this.RatingService.getRatingsByBook(this.productID).subscribe(
            (data) => {
              this.ratings = data;
              this.commentsLength = data.length;

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Deleted successfully',
                showConfirmButton: false,
                timer: 1500,
              });
            }
          );
        });
      }
    });
  }
}
