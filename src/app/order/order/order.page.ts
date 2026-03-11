import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel, IonList, IonItem, IonThumbnail, IonText, IonButton, AlertController, MenuController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, cafeOutline, restaurantOutline, analyticsOutline, optionsOutline, trashOutline, cartOutline, checkmarkDoneOutline } from 'ionicons/icons';
import { CartService, CartItem } from '../../services/cart.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel, IonList, IonItem, IonThumbnail, IonText, IonButton]
})
export class OrderPage implements OnInit {

  cartItems: CartItem[] = [];
  pageTitleChars = 'Order'.split('');

  constructor(
    private cartService: CartService, 
    private alertController: AlertController,
    private reportService: ReportService,
    private menuCtrl: MenuController
  ) {
    addIcons({
      'home': homeOutline,
      'cafe': cafeOutline,
      'restaurant': restaurantOutline,
      'analytics': analyticsOutline,
      'options-outline': optionsOutline,
      'trash-outline': trashOutline,
      'cart-outline': cartOutline,
      'checkmark-done-outline': checkmarkDoneOutline
    });
  }

  ngOnInit() {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
    });
  }

  updateQuantity(item: CartItem, change: number) {
    this.cartService.updateQuantity(item, change);
  }

  deleteItem(item: CartItem) {
    this.cartService.removeItem(item);
  }

  async checkout() {
    if (this.cartItems.length === 0) return;

    const totalPrice = this.cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    
    // Save report
    this.reportService.addReport(this.cartItems, totalPrice);
    
    // Clear cart
    this.cartService.clearCart();

    const alert = await this.alertController.create({
      header: 'Done!',
      message: `Your order of $${totalPrice.toFixed(2)} has been placed successfully.`,
      buttons: ['OK'],
      cssClass: 'cool-alert'
    });

    await alert.present();
  }

  openMenu() {
    this.menuCtrl.open('start');
  }
}
