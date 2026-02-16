import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { AddproductService } from '../service/addproduct.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  productImages: undefined |product [];
  productList: undefined|product[];
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private addproduct:AddproductService){}

  ngOnInit(){
     this.addproduct.displayProduct().subscribe((result)=>{
      // console.warn(result)
     this.productImages=result
    })
    this.addproduct.displayproductList().subscribe((data)=>{
      // console.log(data);
      this.productList=data
    })
  }


}
