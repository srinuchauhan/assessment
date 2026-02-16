import { Component } from '@angular/core';
import { AddproductService } from '../service/addproduct.service';
import { Cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  totalPrice: number | undefined;
cartData:Cart[]|undefined;
 orderMsg:string|undefined;
  constructor(private product:AddproductService,private router:Router){

  }
  ngOnInit(){
    this.product.currentItems().subscribe((result)=>{
      let price=0;
      this.cartData=result;
      result.forEach((items)=>{
       if(items.quantity)
        price=price+ (+items.price *items.quantity)
       });
       
       this.totalPrice = price + (price / 10) + 100 - (price / 10);
      console.log(this.totalPrice);
      })
  }
  orderNow(data:any){
    console.log(data);
let user=localStorage.getItem('user');
let userId=user &&JSON.parse(user).id;

if(this.totalPrice){
  let orderData:order={
    ...data,
    userId,
    totalPrice: this.totalPrice,
   id:undefined
  }
  this.cartData?.forEach((item:any)=>{
    setTimeout(() => {
     item.id && this.product.deleteToCart(item.id)
    }, 600);
  })
   
  this.product.orderNow(orderData).subscribe((result)=>{
    if(result){
      this.orderMsg="you are order has been placed"
      console.log(this.orderMsg);
      setTimeout(() => {
        this.router.navigate(['/my-order'])
        this.orderMsg=undefined;
      }, 1000);
    }
})
}
}
}
