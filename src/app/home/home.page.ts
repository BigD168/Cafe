import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationExtras } from '@angular/router'; // Import Router and NavigationExtras
import { IonHeader, IonToolbar, IonTitle, IonContent, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFooter, IonModal, IonGrid, IonRow, IonCol, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { MenuController } from '@ionic/angular/standalone';
import { homeOutline, cafeOutline, restaurantOutline, analyticsOutline, optionsOutline, arrowForward, chevronForward, closeOutline, home, cafe, restaurant, analytics } from 'ionicons/icons';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFooter, IonModal, IonGrid, IonRow, IonCol, IonButton],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  
  isCategoryModalOpen = false;

  greetingWords = [
    { text: 'GOOD', chars: 'GOOD'.split('') },
    { text: 'MORNING', chars: 'MORNING'.split('') }
  ];

  categories = [
    { name: 'All', active: true },
    { name: 'Matcha', active: false },
    { name: 'Coffee', active: false },
    { name: 'Tea', active: false },
    { name: 'Smoothie', active: false },
    { name: 'Cake', active: false },
    { name: 'Ice Cream', active: false }
  ];

  allProducts = [
    {
      name: 'Matcha Latte',
      description: 'Oat Milk * 25% Sugar',
      price: 4.50,
      image: 'assets/icon/img1.png',
      category: 'Matcha'
    },
    {
      name: 'Matcha Original',
      description: 'Less Ice',
      price: 3.50,
      image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Matcha'
    },
    {
      name: 'Green Tea',
      description: 'milk, less sugar',
      price: 1.25,
      image: 'assets/icon/img2.png',
      category: 'Tea'
    },
    {
      name: 'coffee',
      description: 'milk',
      price: 2.50,
      image: 'assets/icon/img3.png',
      category: 'Coffee'
    },
      {
      name: 'Muffin',
      price: 5.50,
      description: 'Fluffy Muffin',
      image: 'assets/icon/img6.png', // Placeholder
      category: 'Cake'
    },
  {
    name: 'Matcha Mille Crepe',
    description: '20 layers of thin crepes with matcha cream.',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1505253149613-112d21d9f6a9',
    category: 'Cake'
  },
  {
    name: 'Japanese Cheesecake',
    description: 'Light, fluffy, and "jiggly" soufflé-style cake.',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad',
    category: 'Cake'
  },
  {
    name: 'Strawberry Shortcake',
    description: 'Light sponge with fresh cream and strawberries.',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
    category: 'Cake'
  },
  {
    name: 'Dark Chocolate Ganache',
    description: 'Rich, flourless chocolate cake with 70% cocoa.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
    category: 'Cake'
  },
  {
    name: 'Earl Grey Chiffon',
    description: 'Airy sponge cake infused with premium tea leaves.',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13',
    category: 'Cake'
  },
  {
    name: 'Classic Red Velvet',
    description: 'Cocoa-based cake with smooth cream cheese frosting.',
    price: 5.80,
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f',
    category: 'Cake'
  },
  {
    name: 'Lemon Blueberry Drizzle',
    description: 'Tangy lemon sponge with fresh blueberries.',
    price: 5.20,
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729',
    category: 'Cake'
  },
  {
    name: 'Tiramisu Layer Cake',
    description: 'Espresso-soaked layers with mascarpone mousse.',
    price: 6.80,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9',
    category: 'Cake'
  },
  {
    name: 'Burnt Basque Cheesecake',
    description: 'Caramelized "burnt" top with a creamy center.',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2',
    category: 'Cake'
  },
  {
    name: 'Berry Blast',
    description: 'Blueberries, raspberries, and strawberries mixed with Greek yogurt.',
    price: 6.75,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    category: 'Smoothie'
  },
  {
    name: 'Sunrise Citrus',
    description: 'Orange, grapefruit, and ginger for a morning kick.',
    price: 6.25,
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80',
    category: 'Smoothie'
  },
  {
    name: 'Midnight Matcha',
    description: 'Ceremonial grade matcha, honey, and vanilla soy milk.',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=80',
    category: 'Smoothie'
  },
  
 
  ];

  constructor(private router: Router, private menuCtrl: MenuController) {
    addIcons({
      optionsOutline,
      arrowForward,
      chevronForward,
      home,
      cafe,
      restaurant,
      analytics,
      homeOutline,
      cafeOutline,
      restaurantOutline,
      analyticsOutline,
      closeOutline
    });
  }

  get products() {
    const activeCategory = this.categories.find(c => c.active);
    if (!activeCategory || activeCategory.name === 'All') {
      return this.allProducts;
    }
    return this.allProducts.filter(p => p.category === activeCategory.name);
  }

  get groupedProducts() {
    const groups: { category: string, products: any[] }[] = [];
    
    // Get unique categories from allProducts (excluding 'All')
    const uniqueCategories = [...new Set(this.allProducts.map(p => p.category))];
    
    uniqueCategories.forEach(cat => {
      groups.push({
        category: cat,
        products: this.allProducts.filter(p => p.category === cat)
      });
    });
    
    return groups;
  }

  selectCategory(category: any) {
    this.categories.forEach(c => c.active = false);
    category.active = true;
  }

  showAllCategories() {
    this.isCategoryModalOpen = true;
  }

  closeCategoryModal() {
    this.isCategoryModalOpen = false;
  }

  selectCategoryFromModal(category: any) {
    this.selectCategory(category);
    this.closeCategoryModal();
  }

  goToDetail(product: any) {
    this.isCategoryModalOpen = false;
    
    // Use setTimeout to ensure the modal state change reflects 
    // before the route transition occurs
    setTimeout(() => {
      let navigationExtras: NavigationExtras = {
        state: {
          product: product
        }
      };
      this.router.navigate(['product-detail'], navigationExtras);
    }, 50);
  }

  goToMenu() {
    this.router.navigate(['/menu']);
  }

  openMenu() {
    this.menuCtrl.open('start');
  }
}
