import { Injectable } from '@angular/core';

import { Product } from '../model/product.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private client: HttpClient) {}

  host = 'http://localhost:8080/api/book';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public getProducts(): Observable<Product[]> {
    return this.client.get<Product[]>(this.host);
  }

  public getProductsPagin(currentPage: any = 0): Observable<any> {
    return this.client.get<any>(`${this.host}/pagin?pageNo=${currentPage}`);
  }

  public getProductsByKeyword(
    keyword: any,
    currentPage: any = 0
  ): Observable<any> {
    if (keyword !== '') {
      return this.client.get<any>(
        `${this.host}/keyword/${keyword}/?pageNo=${currentPage}`
      );
    }
    return this.client.get<Product[]>(this.host);
  }

  public getProductsByCategory(keyword: any): Observable<Product[]> {
    return this.client.get<Product[]>(`${this.host}/byCategory/${keyword}`);
  }

  public getProductById(id: any): Observable<Product> {
    return this.client.get<Product>(`${this.host}/${id}`);
  }

  public addProduct(produit: Product): Observable<void> {
    return this.client.post<void>(this.host, produit, this.httpOptions);
  }

  public deleteProduct(id: any): Observable<void> {
    return this.client.delete<void>(`${this.host}/${id}`);
  }

  public updateProduct(id: any, produit: Product): Observable<void> {
    return this.client.put<void>(
      `${this.host}/${id}`,
      produit,
      this.httpOptions
    );
  }

  public upload(file: any): Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', file, file.name);

    // Make http post request over api
    // with formData as req
    return this.client.post(`${this.host}/upload`, formData);
  }
}
