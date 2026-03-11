import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonButton, 
  IonIcon, 
  IonItem, 
  IonInput, 
  IonSpinner,
  ToastController,
  NavController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, 
  personOutline, 
  mailOutline, 
  cameraOutline,
  saveOutline
} from 'ionicons/icons';
import { Auth, updateProfile, User } from '@angular/fire/auth';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
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
export class ProfilePage implements OnInit {
  name = '';
  email = '';
  loading = false;
  user: User | null = null;

  private auth = inject(Auth);
  private storage = inject(Storage);
  private toastCtrl = inject(ToastController);
  private navCtrl = inject(NavController);

  constructor() {
    addIcons({ 
      arrowBackOutline, 
      personOutline, 
      mailOutline, 
      cameraOutline,
      saveOutline
    });
  }

  ngOnInit() {
    this.user = this.auth.currentUser;
    if (this.user) {
      this.name = this.user.displayName || '';
      this.email = this.user.email || '';
    }
  }

  async updateProfile() {
    if (!this.name) {
      this.showToast('Name cannot be empty', 'warning');
      return;
    }

    if (!this.user) return;

    this.loading = true;
    try {
      await updateProfile(this.user, {
        displayName: this.name
      });
      this.showToast('Profile updated successfully!', 'success');
    } catch (error) {
      console.error(error);
      this.showToast('Failed to update profile', 'danger');
    } finally {
      this.loading = false;
    }
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      await this.uploadImage(file);
    }
  }

  async uploadImage(file: File) {
    if (!this.user) return;

    this.loading = true;
    try {
      const filePath = `profiles/${this.user.uid}/${Date.now()}_${file.name}`;
      const storageRef = ref(this.storage, filePath);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await updateProfile(this.user, {
        photoURL: downloadURL
      });

      this.showToast('Profile picture updated!', 'success');
    } catch (error) {
      console.error(error);
      this.showToast('Upload failed', 'danger');
    } finally {
      this.loading = false;
    }
  }

  goBack() {
    this.navCtrl.navigateRoot('/home');
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
