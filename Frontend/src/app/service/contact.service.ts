import { Injectable } from '@angular/core';

import { Contact } from '../model/contact.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private client: HttpClient) {}

  host = 'http://localhost:8080/api/contact';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public getContacts(): Observable<Contact[]> {
    return this.client.get<Contact[]>(this.host);
  }

  public getContactsByKeyword(keyword: any): Observable<Contact[]> {
    if (keyword !== '') {
      return this.client.get<Contact[]>(`${this.host}/keyword/${keyword}`);
    }
    return this.client.get<Contact[]>(this.host);
  }

  public getContactById(id: any): Observable<Contact> {
    return this.client.get<Contact>(`${this.host}/${id}`);
  }

  public addContact(contact: Contact): Observable<void> {
    return this.client.post<void>(this.host, contact, this.httpOptions);
  }

  public deleteContact(id: any): Observable<void> {
    return this.client.delete<void>(`${this.host}/${id}`);
  }
}
