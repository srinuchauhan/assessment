import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddproductService } from '../service/addproduct.service';
import { Cart, product } from '../data-type';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  detailProduct: undefined | product;
  quantity: number = 1;
  removeCart=false;
  cartData: product |undefined;
  constructor(
    private activateRoutes: ActivatedRoute,
    private productService: AddproductService,
    private router:Router
  ) {}

  ngOnInit() {
    let productdetail = this.activateRoutes.snapshot.paramMap.get('productId');

    productdetail &&
      this.productService.getProduct(productdetail).subscribe((result) => {
        this.detailProduct = result;
        // console.log(this.detailProduct);
       let cartData=localStorage.getItem('localCart');
       if(productdetail && cartData){
        let items=JSON.parse(cartData);
        items=items.filter((item:product)=>productdetail===item.id.toString())
        if(items.length){
          this.removeCart=true
        }
        else{
          this.removeCart=false
        }
      }
       let user=localStorage.getItem('user');
       if(user){
        let userId=user &&JSON.parse(user).id;
        this.productService.getCartList(userId);
        this.productService.cartData.subscribe((result:any)=>{
          let item = result.filter((item:product)=>productdetail?.toString()===item.productId?.toString())
   if(item.length){
    this.cartData=item[0]
    this.removeCart=true;
   }        
})

       }
      });
  }



  productquantity(val: string) {
    if (this.quantity < 20 && val === 'plus') {
      this.quantity += 1;
    } else if (this.quantity > 1 && val === 'minus') {    
      this.quantity -= 1;
    }
  }




  addtocart() {
    if (this.detailProduct) {
      this.detailProduct.quantity = this.quantity;
      console.warn(this.detailProduct);
      if(!localStorage.getItem('user')){
// console.warn(this.detailProduct);
this.productService.localAddToCart(this.detailProduct)
this.removeCart=true;
}else{
  let user=localStorage.getItem('user');
  let userId= user&&JSON.parse(user).id;
  console.log(userId);

  let cartData:Cart={
    ...this.detailProduct,
    userId,
    productId:this.detailProduct.id
  }

    delete cartData.id;
  this.productService.addToCart(cartData).subscribe((result)=>{
    console.log(result);
    if(result){
   this.productService.getCartList(userId);
   this.removeCart=true;
    }
  })
  
}
    }
  }
  removeToCart(productId:number){
     if(!localStorage.getItem('user')){
this.productService.removeItemFromCart(productId)

    }else{
      let user = localStorage.getItem('user');
      let userId= user && JSON.parse(user).id;
      // console.warn("cartData", this.cartData);
      
      this.cartData && this.productService.removeToCart(this.cartData.id)
      .subscribe((result:any)=>{
        if(result){
          this.productService.getCartList(userId);
        //  this.removeCart=true;
        }
        
      })
       this.removeCart=false
    }
  }

  // buyItems(productId:number){

  //   this.router.navigate(['cart-page'])cart-page
  // }
  buyItems(productId: number) {
  const order = {
    product: this.detailProduct,
    quantity: this.quantity,
    // totalPrice: this.detailProduct.price * this.quantity,
    date: new Date()
  };

  localStorage.setItem('buyNowOrder', JSON.stringify(order));
  this.router.navigate(['/cart-page']);
}


}
