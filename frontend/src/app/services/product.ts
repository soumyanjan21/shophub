import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category?: string;
  description?: string;
  emoji?: string; // Keeping optional for backward compatibility if needed, but 'image' is primary now
  image?: string;
  type?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = '/api/products';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
