import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../constants';

export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  image: string;
  type: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API_ROUTES.PRODUCTS);
  }
}
