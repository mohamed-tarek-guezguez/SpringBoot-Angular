import { Injectable } from '@angular/core';

import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private client: HttpClient) {}

  host = 'http://localhost:8080/api/user';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public getUsers(): Observable<User[]> {
    return this.client.get<User[]>(this.host);
  }

  public getUsersByKeyword(keyword: any): Observable<User[]> {
    if (keyword !== '') {
      return this.client.get<User[]>(`${this.host}/keyword/${keyword}`);
    }
    return this.client.get<User[]>(this.host);
  }

  public getUserById(id: any): Observable<User> {
    return this.client.get<User>(`${this.host}/${id}`);
  }

  public addUser(user: User): Observable<void> {
    return this.client.post<void>(this.host, user, this.httpOptions);
  }

  public deleteUser(id: any): Observable<void> {
    return this.client.delete<void>(`${this.host}/${id}`);
  }

  public updateUser(id: any, user: User): Observable<void> {
    return this.client.put<void>(`${this.host}/${id}`, user, this.httpOptions);
  }

  public login(user: User): Observable<any> {
    return this.client.post<any>(`${this.host}/login`, user, this.httpOptions);
  }
}
