import { Injectable } from '@angular/core';

import { Rating } from '../model/rating.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private client: HttpClient) {}

  host = 'http://localhost:8080/api/rating';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public getRatings(): Observable<Rating[]> {
    return this.client.get<Rating[]>(this.host);
  }

  public getRatingById(id: any): Observable<Rating> {
    return this.client.get<Rating>(`${this.host}/${id}`);
  }

  public addRating(rating: Rating): Observable<void> {
    return this.client.post<void>(this.host, rating, this.httpOptions);
  }

  public deleteRating(id: any): Observable<void> {
    return this.client.delete<void>(`${this.host}/${id}`);
  }

  public getRatingsByBook(id: any): Observable<Rating[]> {
    return this.client.get<Rating[]>(`${this.host}/byBook/${id}`);
  }
}
