import { Component } from '@angular/core';
import { AddproductService } from '../service/addproduct.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {

  orderData:order[] |undefined;
  constructor(private product:AddproductService){

  }
ngOnInit(){
this.getOrderList();
}
cancelOrder(orderId:number|undefined){
  orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
    this.getOrderList();
  })
}

getOrderList(){
  this.product.getOrderList().subscribe((result)=>{
    this.orderData=result;
   })
}
}
