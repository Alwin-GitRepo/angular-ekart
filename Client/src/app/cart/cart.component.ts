import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  showPayPal: boolean = false;
  showSuccess : boolean = false;
  public payPalConfig?: IPayPalConfig;
  constructor(private api: ApiService) {}
  cartProducts: any = [];

  ngOnInit(): void {
    this.fetchCartProducts()
    this.initConfig();
  }

  fetchCartProducts() {
    if (sessionStorage.getItem('token')) {
      this.api.viewProductsInCart().subscribe({
        next: (item: any) => {
          this.cartProducts = item;
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }

  // remove wishlist product
  removeCartProduct(productId: any) {
    if (sessionStorage.getItem('token')) {
      this.api.removeFromCart(productId).subscribe({
        next: (item: any) => {
          alert(item.message);
          this.fetchCartProducts();
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }
  
  // get cart total
  getCartTotal() {
    let total: any = 0;
    this.cartProducts.forEach((product: any) => {
      total += product.grandTotal;
    });
    return Math.ceil(total);
  }
  
  // increment cart items
  incrementCartItems(productId: any) {
    if (sessionStorage.getItem('token')) {
      this.api.incrementCartProduct(productId).subscribe({
        next: (item: any) => {
          // this.cartProducts = item
          this.fetchCartProducts()
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }
  
  // decrementCartProduct cart items
  decrementCartItems(productId: any) {
    if (sessionStorage.getItem('token')) {
      this.api.decrementCartProduct(productId).subscribe({
        next: (item: any) => {
          // this.cartProducts = item
          this.fetchCartProducts()
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }

  private initConfig(): void {
      this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '9.99',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details:any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
    }

    makePay(){
      this.showPayPal = true
    }

}
