import { Component, OnInit } from '@angular/core';
import { Contact } from '../../model/contact.model';
import { ContactService } from '../../service/contact.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  constructor(private service: ContactService, private router: Router) {}

  contacts?: Contact[];
  searchText?: string = '';

  ngOnInit(): void {
    if (!localStorage.getItem('authUserId')) {
      this.router.navigate(['login']);
    }

    this.service.getContacts().subscribe((data) => {
      this.contacts = data;
    });
  }

  Search() {
    this.service.getContactsByKeyword(this.searchText).subscribe((data) => {
      this.contacts = data;
    });
  }

  isEmpty() {
    if (this.contacts?.length == 0) {
      return true;
    }
    return false;
  }

  Remove(item: Contact) {
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
        this.service.deleteContact(item.id).subscribe((response) => {
          this.service.getContacts().subscribe((data) => {
            this.contacts = data;
          });
        });
      }
    });
  }
}
