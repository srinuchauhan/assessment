import { Component } from '@angular/core';
import { product } from '../data-type';
import { AddproductService } from '../service/addproduct.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {
  addedSuccessfully:string |undefined;
showManual:boolean=false

constructor(private addproduct:AddproductService){}

ngOnInit():void{}
product(data:product):void{
  // console.log(data);
  this.addproduct.productService(data).subscribe((result)=>{
    // console.log(result);
  if(result){
   this.addedSuccessfully="product is added successfully";
  }
  setTimeout(()=>(this.addedSuccessfully=undefined),3000)

})
}

// onFileSelected(event:any){
//   let workBook: XLSX.WorkBook | null = null;
//   let jsonData = null;
//   const reader = new FileReader();
//   const file = event.target.files[0];
//   reader.onload = (event) => {
//     const data = reader.result;
//     workBook = XLSX.read(data, { type: 'binary' });
//     jsonData = workBook.SheetNames.reduce((initial, name) => {
//     let sheet = workBook.Sheets[name];
//     initial[name] = XLSX.utils.sheet_to_json(sheet);
//       return initial;
//     }, {});
//     const dataString = JSON.stringify(jsonData);
//     // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
//     // this.setDownload(dataString);
//   }
//   reader.readAsBinaryString(file);
// }


manual(){
  this.showManual=true;
}
}
