// import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { product } from '../data-type';
import { AddproductService } from '../service/addproduct.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent {
  productList: undefined | product[];
  productdelete: string | undefined;
  icon = faTrash;
  Editicon = faEdit;
  constructor(private http: AddproductService) {}
  ngOnInit(): void {
    this.http.listProduct().subscribe((result) => {
      //it will display list of product
      // console.log(result);
      this.productList = result;
    });
  }
  delete(id: number) {
    // call the api to delete the product based on the product id
    this.http.productdelete(id).subscribe((result) => {
      // console.log(result);
      if (result) {
        this.productdelete = 'product is deleted successfully';
      }
      setTimeout(() => (this.productdelete = undefined), 3000);
    });
  }

}
