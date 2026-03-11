import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular/standalone';
import { 
  IonContent, 
  IonButton, 
  IonIcon, 
  IonItem, 
  IonInput, 
  IonSpinner 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  keyOutline, 
  mailOutline, 
  arrowBackOutline 
} from 'ionicons/icons';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonButton, 
    IonIcon, 
    IonItem, 
    IonInput, 
    IonSpinner, 
    CommonModule, 
    FormsModule
  ]
})
export class ForgotPasswordPage implements OnInit {
  email = '';
  loading = false;

  private auth = inject(Auth);
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);

  constructor() {
    addIcons({ keyOutline, mailOutline, arrowBackOutline });
  }

  ngOnInit() {}

  async resetPassword() {
    if (!this.email) {
      this.showToast('Please enter your email address', 'warning');
      return;
    }

    this.loading = true;
    try {
      await sendPasswordResetEmail(this.auth, this.email);
      this.showToast('Reset link sent to your email!', 'success');
      this.navCtrl.back();
    } catch (error: any) {
      console.error(error);
      let message = 'Failed to send reset link. Please try again later.';
      if (error.code === 'auth/user-not-found') {
        message = 'No user found with this email.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'The email address is badly formatted.';
      }
      this.showToast(message, 'danger');
    } finally {
      this.loading = false;
    }
  }

  goBack() {
    this.navCtrl.back();
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
