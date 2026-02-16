import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddproductService } from '../service/addproduct.service';
import { Cart, priceSummary } from '../data-type';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  
 cartData: Cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0, 
    delivery: 0,
    total: 0
  }
  price: number | undefined;
 
  constructor(private product:AddproductService, private router: Router) { }

  ngOnInit(): void {
    this.loadDetails()

  }
  checkOut(){
    this.router.navigate(['check-out'])
  }


  removeToCart(cartId:number|undefined){
    cartId && this.cartData && this.product.removeToCart(cartId)
    .subscribe((result)=>{
      this.loadDetails();
    })
  }

  loadDetails(){
    this.product.currentItems().subscribe((result) => {
      this.cartData = result;
      // this.discountprice=this.cartData.discount
        console.warn(this.cartData);
      let price = 0;
      let discount=0;
      let discountAmount=0;
      result.forEach((item) => {
        if (item.quantity) {
          console.log(item.quantity);
          price = price + (+item.price * +item.quantity)
        }
       if(item.discount){
          console.log(item.discount);
  discountAmount=item.discount/100;
  console.log(discountAmount);
        }
      })
      this.priceSummary.price = price;
    this.priceSummary.discount =price*discount;
    console.log(this.priceSummary.discount);
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100-(price*discount);

    if(!this.cartData.length){
      this.router.navigate(['/'])
    }

    })
  }

}