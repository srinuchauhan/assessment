import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddproductService } from '../service/addproduct.service';
import { product } from '../data-type';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = ' ';
  searchElement: undefined | product[];
  userName: string=' ';
  cartItem=0;
  constructor(private router: Router, private addproduct: AddproductService) {}

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
         let sellerStore=localStorage.getItem('seller');
         let sellerData =sellerStore && JSON.parse(sellerStore);
         this.sellerName=sellerData.name;
          this.menuType = 'seller';
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';
  this.addproduct.getCartList(userData.id)
        }
         else {
          this.menuType = 'default';
        }
      }
    });

    let cartData=localStorage.getItem('localCart');
    if(cartData){
      this.cartItem=JSON.parse(cartData).length
    }
    this.addproduct.cartData.subscribe((items)=>{
      this.cartItem=items.length;
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth'])
    this.addproduct.cartData.emit([])
  };

  // redirectToDetails(id:number){
  //   this.router.navigate(['/product-detail/'+id])
  // }

  search(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      // console.log(element.value);
      this.addproduct.searchproduct(element.value).subscribe((data) => {
        if (data.length > 5) {
          data.length = length;
        }
        this.searchElement = data;
      });
    }
  }

  hidesearch() {
    this.searchElement = undefined;
  }

  searchpage(val: string) {
    this.router.navigate([`search/${val}`]);
    console.log(val);
  } 

  redirectToDetails(id:number){
    this.router.navigate([`/product-detail/${id}`])
  }
}
