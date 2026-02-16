import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UpdateproductService {

  constructor(private http:HttpClient) { }

  ngOnInit(){

  }

  updateproduct(product:product){
    return this.http.put<product>(`http://localhost:3000/product/${product.id}`,product)
  }
}
