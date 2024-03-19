import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit{
  constructor(private Route:ActivatedRoute, private api:ApiService){}
  productDetails:any = {};

  ngOnInit(): void {
    // get an id of particular product
    this.Route.params.subscribe((res:any) => {
      const {id} = res
      // api call
      this.viewProduct(id)
    })
  }
  
  viewProduct(id:any){
    this.api.getProductById(id).subscribe((response:any) => {
      this.productDetails = response
    })
  }

  // add to wishlist product
  addToWishlist(product:any){
    if(sessionStorage.getItem('token')){
      let {id,title,price,image} = product
      let productDetails = {id,title,price,image} 
      this.api.addProductToWislist(productDetails).subscribe({
        next: (item:any)=>{
          alert("Product added to wishlist")
        },
        error: (err) =>{
          alert(err.error.message)
        }
      })
    }
  }

  // add to wishlist product
  addToCart(product:any){
    if(sessionStorage.getItem('token')){
      Object.assign(product,{quantity:1})
      this.api.addProductToCart(product).subscribe({
        next: (item:any)=>{
          alert(item.message)
        },
        error: (err) =>{
          alert(err.error.message)
        }
      })
    }
  }

}
