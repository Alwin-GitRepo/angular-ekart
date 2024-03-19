import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{

  allProducts:any = []
  searchProducts : any = ""
  searchKey : string = ""
  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getAllProducts().subscribe((products:any)=>{
        this.allProducts = products;
        console.log(this.allProducts);
    })
    this.api.searchTerm.subscribe((term:string)=>{
      this.searchKey=term
      console.log(this.searchKey)
      
    })
    // this.searchKey=this.api.searchTerm
  }
}
