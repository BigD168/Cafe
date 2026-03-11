import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { 
  IonContent, 
  IonButton, 
  IonIcon, 
  IonItem, 
  IonInput, 
  IonSpinner,
  ToastController,
  LoadingController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  cafeOutline, 
  mailOutline, 
  lockClosedOutline, 
  eyeOutline, 
  eyeOffOutline 
} from 'ionicons/icons';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonButton, 
    IonIcon, 
    IonItem, 
    IonInput, 
    IonSpinner,
    CommonModule, 
    FormsModule,
    RouterModule
  ]
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  showPassword = false;
  loading = false;

  private auth = inject(Auth);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  constructor() {
    addIcons({ cafeOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline });
  }

  ngOnInit() {}

  async login() {
    if (!this.email || !this.password) {
      this.showToast('Please enter both email and password', 'warning');
      return;
    }

    this.loading = true;
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.showToast('Login successful!', 'success');
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (error: any) {
      console.error(error);
      let message = 'Login failed. Please check your credentials.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        message = 'Invalid email or password.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'The email address is badly formatted.';
      }
      this.showToast(message, 'danger');
    } finally {
      this.loading = false;
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}
