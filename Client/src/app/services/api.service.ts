import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://localhost:5000"

  constructor(private http:HttpClient) { }

  searchTerm = new BehaviorSubject('') // to hold the search term

  // register 
  register(body:any){
    return this.http.post(`${this.baseurl}/user/register`, body)
  }
  
  // /login 
  login(body:any){
    return this.http.post(`${this.baseurl}/user/login`, body)
  }
  
  // get all product
  getAllProducts(){
    return this.http.get(`${this.baseurl}/products/all-products`)
  }
  // get all product
  getProductById(id:any){
    return this.http.get(`${this.baseurl}/products/view/${id}`)
  }

  appendTokenToHeader() {
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', 'Bearer ' + token);
    }
    return { headers };
  }
  

  // add product to wishlist
  addProductToWislist(product:any){
    return this.http.post(`${this.baseurl}/user/wishlist/add`,product,this.appendTokenToHeader())
  }
  // add product to wishlist
  removeFromWishlist(productId:any){
    return this.http.delete(`${this.baseurl}/user/wishlist/${productId}`,this.appendTokenToHeader())
  }
  
  // view products in wishlist
  viewProductsInWislist(){
    return this.http.get(`${this.baseurl}/user/wishlist/view`,this.appendTokenToHeader())
  }
  
  // add product to cart
  addProductToCart(product:any){
    return this.http.post(`${this.baseurl}/user/cart/add`,product,this.appendTokenToHeader())
  }
  
  // view products in cart
  viewProductsInCart(){
    return this.http.get(`${this.baseurl}/user/cart/view`,this.appendTokenToHeader())
  }
  
  // remove product from cart
  removeFromCart(productId:any){
    return this.http.delete(`${this.baseurl}/user/cart/${productId}`,this.appendTokenToHeader())
  }
  
  // increment quantity
  incrementCartProduct(productId:any){
    return this.http.put(`${this.baseurl}/user/cart/increment/${productId}`,{},this.appendTokenToHeader())
  }
  
  // decrement quantity
  decrementCartProduct(productId:any){
    return this.http.put(`${this.baseurl}/user/cart/decrement/${productId}`,{},this.appendTokenToHeader())
  }
}
