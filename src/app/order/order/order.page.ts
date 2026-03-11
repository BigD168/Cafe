import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel, IonList, IonItem, IonThumbnail, IonText, IonButton, AlertController, MenuController, IonGrid, IonRow, IonCol, IonModal } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, cafeOutline, restaurantOutline, analyticsOutline, optionsOutline, trashOutline, cartOutline, checkmarkDoneOutline, home, cafe, restaurant, analytics } from 'ionicons/icons';
import { CartService, CartItem } from '../../services/cart.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel, IonList, IonItem, IonThumbnail, IonText, IonButton, IonGrid, IonRow, IonCol, IonModal]
})
export class OrderPage implements OnInit {

  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  pageTitleChars = 'Order'.split('');
  isPaymentModalOpen = false;

  constructor(
    private cartService: CartService, 
    private alertController: AlertController,
    private reportService: ReportService,
    private menuCtrl: MenuController
  ) {
    addIcons({
      home,
      cafe,
      restaurant,
      analytics,
      homeOutline,
      cafeOutline,
      restaurantOutline,
      analyticsOutline,
      optionsOutline,
      trashOutline,
      cartOutline,
      checkmarkDoneOutline
    });
  }

  ngOnInit() {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.cartTotal = this.cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }

  updateQuantity(item: CartItem, change: number) {
    this.cartService.updateQuantity(item, change);
  }

  deleteItem(item: CartItem) {
    this.cartService.removeItem(item);
  }

  async checkout() {
    if (this.cartItems.length === 0) return;
    this.isPaymentModalOpen = true;
  }

  async confirmPayment() {
    this.isPaymentModalOpen = false;
    const totalPrice = this.cartTotal;
    
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
