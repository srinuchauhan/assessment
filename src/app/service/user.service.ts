import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp, user } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLoggedIn: any;
invalidUserAuth=new EventEmitter<boolean>(false)
  constructor(private http:HttpClient,private router:Router) { }
userSignUp(data:signUp){
return this.http.post(`http://localhost:3000/user`,data,{observe:'response'}).subscribe((result)=>{
  if(result){
    localStorage.setItem('user',JSON.stringify(result.body));
    this.router.navigate(['/']);
    // console.log('result',result)
    // this.isUserLoggedIn.next(true)
  }
})
}

userLogin(data:login){
return this.http.get<signUp[]>(`http://localhost:3000/user?email=${data.emailid}&password=${data.password}`,
{observe:'response'})
.subscribe((result:any)=>{
  if(result && result.body?.length){
    this.invalidUserAuth.emit(false)
    localStorage.setItem('user',JSON.stringify(result.body[0]));
    console.log(result)
    this.router.navigate(['/']);
  }
  else{
this.invalidUserAuth.emit(true);
  }
})
}
userAuthReload(){
if(localStorage.getItem('user')){
  this.router.navigate(['/']);
}
}

}
