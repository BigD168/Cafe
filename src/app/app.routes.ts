import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
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
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.page').then( m => m.AboutPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
  },
];
