import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  product: any;
  quantity: number;
  size?: string;
  sugar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor() { }

  getCart() {
    return this.cartSubject.asObservable();
  }

  addToCart(product: any, size?: string, sugar?: string) {
    const existingItem = this.cart.find(item => 
      item.product.name === product.name && 
      item.size === size && 
      item.sugar === sugar
    );
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ product: product, quantity: 1, size: size, sugar: sugar });
    }
    
    this.cartSubject.next(this.cart);
  }

  removeItem(itemToRemove: CartItem) {
    this.cart = this.cart.filter(item => 
      !(item.product.name === itemToRemove.product.name && 
        item.size === itemToRemove.size && 
        item.sugar === itemToRemove.sugar)
    );
    this.cartSubject.next(this.cart);
  }

  updateQuantity(itemToUpdate: CartItem, change: number) {
    const item = this.cart.find(item => 
      item.product.name === itemToUpdate.product.name && 
      item.size === itemToUpdate.size && 
      item.sugar === itemToUpdate.sugar
    );
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeItem(itemToUpdate);
      } else {
        this.cartSubject.next(this.cart);
      }
    }
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }

  // Helper to get current value without subscribing
  getCartItems() {
    return this.cart;
  }
}
