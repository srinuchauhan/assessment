import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, order, product } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class AddproductService {
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) {}

  productService(data: product) {
    let productData={
     BaseUrl:"http://localhost:3000/product",
     BODY:data,
    };
    return this.http.post(productData.BaseUrl,productData.BODY);
  }

  listProduct() {
    let productListData={
      BaseUrl:'http://localhost:3000/product',
    };
    return this.http.get<product[]>(productListData.BaseUrl);
  }

  productdelete(id: number) {
    return this.http.delete(`http://localhost:3000/product/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/product/${id}`);
  }

  displayProduct() {
    return this.http.get<product[]>('http://localhost:3000/product?_limit=3');
  }

  displayproductList() {
    return this.http.get<product[]>('http://localhost:3000/product');
  }

  searchproduct(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/product?q=${query}`);
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productdetail: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productdetail !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      // console.warn(items);
      this.cartData.emit(items);
    }
  }
  addToCart(cartData: Cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: number) {
    return this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result: any) => {
        if (result) {
          this.cartData.emit(result.body);
          // console.log(result);
        }
      });
  }

  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  currentItems() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>('http://localhost:3000/cart?userId='+ userData.id);
  }

  orderNow(data:order){
return this.http.post(' http://localhost:3000/order',data)
  }
  

  getOrderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
return this.http.get<order[]>('http://localhost:3000/order?userId='+userData.id)

  }
deleteToCart(cartId:number){
  return this.http.delete('http://localhost:3000/cart/' + cartId,{observe:'response'}).subscribe((result)=>{
    if (result) {
      this.cartData.emit([]);
    }
  })
}

cancelOrder(orderId:number){
  return this.http.delete('http://localhost:3000/order/'+orderId)
}
}
