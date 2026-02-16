import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { login, signUp } from '../data-type';
// import { SellerHomeComponent } from '../seller-home/seller-home.component';
import { SellerAuthService } from '../service/seller-auth.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent  implements OnInit{
constructor(private seller:SellerAuthService){
}
showLogin=false;
authError:string="";

ngOnInit(): void {
//   this.seller.reloadseller()
 }
signUp(form: any) {
  debugger
  if (!form.valid) {
    return; 
  }
  this.seller.sellerSignUp(form.value);
}


Login(data:signUp){
   this.authError="";
this.seller.sellerLogin(data);
this.seller.isLogginError.subscribe((isError)=>{
  if(isError){
    this.authError="Email or password is not correct"
  }
})

}

openLogin(){
  this.showLogin=true;
};

opensignUp(){
this.showLogin=false;
}
}
