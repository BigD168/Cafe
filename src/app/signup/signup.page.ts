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
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personAddOutline, 
  personOutline, 
  mailOutline, 
  lockClosedOutline, 
  shieldCheckmarkOutline,
  eyeOutline, 
  eyeOffOutline 
} from 'ionicons/icons';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
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
export class SignupPage implements OnInit {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  loading = false;

  private auth = inject(Auth);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  constructor() {
    addIcons({ 
      personAddOutline, 
      personOutline, 
      mailOutline, 
      lockClosedOutline, 
      shieldCheckmarkOutline,
      eyeOutline, 
      eyeOffOutline 
    });
  }

  ngOnInit() {}

  async signUp() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.showToast('Please fill in all fields', 'warning');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showToast('Passwords do not match', 'warning');
      return;
    }

    if (this.password.length < 6) {
      this.showToast('Password should be at least 6 characters', 'warning');
      return;
    }

    this.loading = true;
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      
      // Update display name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: this.name
        });
      }

      this.showToast('Account created successfully!', 'success');
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (error: any) {
      console.error(error);
      let message = 'Account creation failed.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'The email address is already in use.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'The email address is badly formatted.';
      } else if (error.code === 'auth/weak-password') {
        message = 'The password is too weak.';
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
