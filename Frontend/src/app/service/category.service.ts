import { Injectable } from '@angular/core';

import { Category } from '../model/category.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private client: HttpClient) {}

  host = 'http://localhost:8080/api/category';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public getCategorys(): Observable<Category[]> {
    return this.client.get<Category[]>(this.host);
  }

  public getCategorysByKeyword(keyword: any): Observable<Category[]> {
    if (keyword !== '') {
      return this.client.get<Category[]>(`${this.host}/keyword/${keyword}`);
    }
    return this.client.get<Category[]>(this.host);
  }

  public getCategoryById(id: any): Observable<Category> {
    return this.client.get<Category>(`${this.host}/${id}`);
  }

  public addCategory(category: Category): Observable<void> {
    return this.client.post<void>(this.host, category, this.httpOptions);
  }

  public deleteCategory(id: any): Observable<void> {
    return this.client.delete<void>(`${this.host}/${id}`);
  }

  public updateCategory(id: any, category: Category): Observable<void> {
    return this.client.put<void>(
      `${this.host}/${id}`,
      category,
      this.httpOptions
    );
  }
}
