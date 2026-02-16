import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddproductService } from '../service/addproduct.service';
import { product } from '../data-type';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
searchResult: undefined |product[];

constructor(private activate:ActivatedRoute, private addproduct:AddproductService){}

ngOnInit(){
  let query=this.activate.snapshot.paramMap.get('query');
  // console.log('query')
  query && this.addproduct.searchproduct(query).subscribe((result)=>{
this.searchResult=result
console.log(this.searchResult);
  })
}
}
