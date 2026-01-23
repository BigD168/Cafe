import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonFooter, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heartOutline, shareSocialOutline, star, starHalf, close } from 'ionicons/icons';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonFooter, IonButton, IonIcon]
})
export class ProductDetailPage implements OnInit {

  product: any;
  sizes = ['S', 'M', 'L'];
  selectedSize = 'S';
  sugarLevels = ['0%', '25%', '50%', '75%', '100%'];
  selectedSugar = '100%';

  constructor(private router: Router, private cartService: CartService) {
    addIcons({ heartOutline, shareSocialOutline, star, starHalf, close });
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.product = navigation.extras.state['product'];
    }
  }

  ngOnInit() {
  }

  get showOptions(): boolean {
    if (!this.product) return true;
    const excludedCategories = ['cake', 'ice cream', 'breakfast'];
    return !excludedCategories.includes(this.product.category?.toLowerCase());
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  selectSugar(level: string) {
    this.selectedSugar = level;
  }

  addToCart() {
    if (this.product) {
      const size = this.showOptions ? this.selectedSize : undefined;
      const sugar = this.showOptions ? this.selectedSugar : undefined;
      this.cartService.addToCart(this.product, size, sugar);
      // Navigate back to home as requested
      this.router.navigate(['/home']);
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}

