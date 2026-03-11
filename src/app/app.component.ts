import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, IonMenu, IonHeader, IonContent, IonList, IonItem, IonIcon, IonLabel, IonSplitPane, MenuController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircle, personOutline, settingsOutline, logOutOutline, homeOutline, restaurantOutline, cafeOutline, analyticsOutline, informationCircleOutline } from 'ionicons/icons';
import { Auth, signOut, onAuthStateChanged, User } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonMenu, IonHeader, IonContent, IonList, IonItem, IonIcon, IonLabel, IonSplitPane],
})
export class AppComponent {
  private auth = inject(Auth);
  private router = inject(Router);
  private menuCtrl = inject(MenuController);

  userName: string = 'Guest User';
  userEmail: string = 'guest@example.com';
  userPhoto: string | null = null;

  constructor() {
    addIcons({
      personCircle,
      homeOutline,
      restaurantOutline,
      cafeOutline,
      analyticsOutline,
      personOutline,
      settingsOutline,
      logOutOutline,
      informationCircleOutline
    });

    // Listen to auth state changes
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        this.userName = user.displayName || 'User';
        this.userEmail = user.email || '';
        this.userPhoto = user.photoURL;
        console.log('User is logged in:', this.userName);
      } else {
        this.userName = 'Guest User';
        this.userEmail = 'guest@example.com';
        this.userPhoto = null;
        console.log('No user logged in');
      }
    });
  }

  async openProfile() {
    await this.menuCtrl.close();
    this.router.navigateByUrl('/profile');
  }

  openSettings() {
    console.log('Settings opened');
    // Implement settings navigation or modal logic here
  }

  async openAbout() {
    await this.menuCtrl.close();
    this.router.navigateByUrl('/about');
  }

  async logout() {
    try {
      await signOut(this.auth);
      await this.menuCtrl.close();
      this.router.navigateByUrl('/login', { replaceUrl: true });
      console.log('User logged out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}
