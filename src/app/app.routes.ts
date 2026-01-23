import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'order',
    loadComponent: () => import('./order/order/order.page').then( m => m.OrderPage)
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu/menu.page').then( m => m.MenuPage)
  },
  {
    path: 'report',
    loadComponent: () => import('./report/report/report.page').then( m => m.ReportPage)
  },
  {
    path: 'product-detail',
    loadComponent: () => import('./product-detail/product-detail.page').then( m => m.ProductDetailPage)
  },
];
