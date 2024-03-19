import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  constructor(private Route: ActivatedRoute, private api: ApiService) {}
  wishlistProducts: any = [];

  ngOnInit(): void {
    // fetch wishlist products
    this.fetchWishlistProducts();
  }

  // view wishlist products
  fetchWishlistProducts() {
    if (sessionStorage.getItem('token')) {
      this.api.viewProductsInWislist().subscribe({
        next: (item: any) => {
          // console.log(item)
          this.wishlistProducts = item;
          // alert("Product added to wishlist")
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }

  // remove wishlist product
  removeWishlistProduct(productId: any) {
    if (sessionStorage.getItem('token')) {
      this.api.removeFromWishlist(productId).subscribe({
        next: (item: any) => {
          alert(item.message);
          this.fetchWishlistProducts();
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }

  // add to wishlist product
  addToCart(product: any) {
    if (sessionStorage.getItem('token')) {
      Object.assign(product,{quantity:1})
      this.api.addProductToCart(product).subscribe({
        next: (item: any) => {
          alert(item.message);
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }
}
