import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private router: Router) {}

  data: any;
  dataLength: any;

  imgUrl = 'http://localhost:8080/api/book/getImage/';

  ngOnInit(): void {
    this.data = JSON.parse(localStorage['myCart']);
    this.dataLength = this.data.length;
  }

  isEmpty() {
    if (this.data?.length == 0) {
      return true;
    }
    return false;
  }

  Remove(data: any) {
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
        var myCart = JSON.parse(localStorage['myCart']);

        console.log(myCart);

        var newData = new Array();

        for (let i = 0; i < myCart.length; i++) {
          if (myCart[i].id !== data.id) {
            newData.push(myCart[i]);
          }
        }

        console.log(newData);

        localStorage['myCart'] = JSON.stringify(newData);

        window.location.reload();
        this.router.navigate(['cart']);
      }
    });
  }
}
