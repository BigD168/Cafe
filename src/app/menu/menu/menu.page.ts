import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel, IonSegment, IonSegmentButton, IonList, IonItem, IonThumbnail, MenuController, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, cafeOutline, restaurantOutline, analyticsOutline, optionsOutline, addCircleOutline, home, cafe, restaurant, analytics } from 'ionicons/icons';

interface Product {
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'drink' | 'breakfast';
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel, IonSegment, IonSegmentButton, IonList, IonItem, IonThumbnail, IonGrid, IonRow, IonCol]
})
export class MenuPage implements OnInit {

  selectedCategory: 'drink' | 'breakfast' = 'drink';
  pageTitleChars = 'Menu'.split('');

  products: Product[] = [
    {
      name: 'matcha latte',
      price: 4.50,
      description: 'Oat Milk * 25% Sugar',
      image: 'assets/icon/img1.png', // Placeholder, ensure these exist or use placeholders
      category: 'drink'
    },
    {
      name: 'Green Tea',
      price: 3.50,
      description: 'milk, less sugar',
      image: 'assets/icon/img2.png',
      category: 'drink'
    },
    {
      name: 'Sandwich',
      price: 6.50,
      description: 'Ham, Cheese, Egg',
      image: 'assets/icon/img5.png', // Placeholder
      category: 'breakfast'
    },
    {
      name: 'Pancakes',
      price: 5.50,
      description: 'Fluffy pancakes with maple syrup',
      image: 'assets/icon/img4.png', // Placeholder
      category: 'breakfast'
    },
    {
      name: 'coffee',
      description: 'milk',
      price: 4.50,
      image: 'assets/icon/img3.png',
      category: 'drink'
    },
     {
      name: 'Muffin',
      price: 5.50,
      description: 'Fluffy Muffin',
      image: 'assets/icon/img6.png', // Placeholder
      category: 'breakfast'
    }
  ];

  constructor(private router: Router, private menuCtrl: MenuController) {
    addIcons({
      optionsOutline,
      addCircleOutline,
      home,
      cafe,
      restaurant,
      analytics,
      homeOutline,
      cafeOutline,
      restaurantOutline,
      analyticsOutline
    });
  }

  ngOnInit() {
  }

  get filteredProducts() {
    return this.products.filter(p => p.category === this.selectedCategory);
  }

  openDetail(product: Product) {
    this.router.navigate(['/product-detail'], {
      state: {
        product: product
      }
    });
  }

  openMenu() {
    this.menuCtrl.open('start');
  }
}
