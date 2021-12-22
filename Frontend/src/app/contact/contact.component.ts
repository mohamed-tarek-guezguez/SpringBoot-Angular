import { Component, OnInit } from '@angular/core';
import { Contact } from '../model/contact.model';
import { ContactService } from '../service/contact.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  constructor(private router: Router, private ContactService: ContactService) {}

  item = {} as Contact;
  error?: any;

  ngOnInit(): void {}

  add(): void {
    if (!localStorage.getItem('authUserId')) {
      this.router.navigate(['login']);
    }

    this.ContactService.addContact(this.item).subscribe(
      (response) => {
        this.item.name = '';
        this.item.email = '';
        this.item.subject = '';
        this.item.message = '';
        this.error = '';
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your message has been sent',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    );
  }
}
