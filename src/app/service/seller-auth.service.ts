import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerAuthService {
  constructor(private http: HttpClient, private router: Router) {}
  isSellerLoggedIn =  new BehaviorSubject<boolean>(false);
  isLogginError = new EventEmitter<boolean>(false);

  sellerSignUp(data: signUp) {
    return this.http
      .post(`http://localhost:3000/seller`, data,{observe:'response'})
      .subscribe((result:any) => {
        // this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
        console.log('result', result);
      });
    // reloadseller(){
    //       if(localStorage.getItem('seller')){
    //         this.isSellerLoggedIn.next(true);
    //         this.router.navigate(['seller-home']);
    //       }
    //     }
  }
  sellerLogin(data:login) {
    // console.warn(data);
    return this.http.get<login>(`http://localhost:3000/seller?email=${data.emailid}&password=${data.password}`,
    {observe:'response'})
    .subscribe((result:any)=>{
      if(result){
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
        console.log(result);
      }
      else{
        console.warn("login failed");
        this.isLogginError.emit(true);
      }
    })
    // return this.http
    //   .get<signUp>(
    //     `http://localhost:3000/seller?email=${data.emailid} &password=${data.password}`,
    //     {observe:'response'}
    //   )
    //   .subscribe((result: any) => {
    //       if(result){
    //         localStorage.setItem('seller',JSON.stringify(result.body[0]));
    //       this.router.navigate(['seller-home']);
    //       console.log('result', result);
    //     } else {
    //       this.isLogginError.emit(true);
    //       console.log('login failed');
    //     }
    //   });
  }
}
