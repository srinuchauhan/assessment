import { Component } from '@angular/core';
import { Cart, product, signUp, user } from '../data-type';
import { UserService } from '../service/user.service';
import { AddproductService } from '../service/addproduct.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  constructor(private user: UserService,private productService:AddproductService) {}
  showLogin = false;
authError:string="";
  ngOnInit() {
    // this.user.userAuthReload();
  }

  userSignUp(data: signUp) {
    this.user.userSignUp(data);
  }

  userLogin(data: any) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      console.warn('apple',result);
      if(result){
  this.authError="please enter valid user crindential"
      }
      else{
        this.localCartToRemoteCart();
      }
    })
  }

  openuserSignUp() {
    this.showLogin = true;
  }

  openuserLogin() {
    this.showLogin = false;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);

      cartDataList.forEach((product: product,index) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId,
        }
        delete cartData.id;
        setTimeout(()=>{
        this.productService.addToCart(cartData).subscribe((result)=>{
          if(result){
            console.warn('items stored in Db')
          }
        })
        if(cartDataList.length===index+1){
          localStorage.removeItem('localCart')
        }
      },500)
      if(cartDataList.length===index+1){
        localStorage.removeItem('localCart')
      }
      });
    }
    this.productService.getCartList(userId);
  }
}
