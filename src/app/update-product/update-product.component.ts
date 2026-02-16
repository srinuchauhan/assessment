import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddproductService } from '../service/addproduct.service';
import { product } from '../data-type';
import { UpdateproductService } from '../service/updateproduct.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent {
  updated: undefined | product;
  updateProduct: string | undefined;
  constructor(
    private route: ActivatedRoute,
    private product: AddproductService,
    private productupdate: UpdateproductService
  ) {}

  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        this.updated = result;
      });
  }
  update(data: product) {
    // console.warn(data);
    if (this.updated) {
      data.id = this.updated.id;
    }
    this.productupdate.updateproduct(data).subscribe((resultdata) => {
      console.log(resultdata);
      if (resultdata) {
        this.updateProduct = 'product is updated successfully';
      }
    });
    setTimeout(() => {
      this.updateProduct = undefined;
    }, 3000);
  }
}
