import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonIcon,
  NavController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, cafeOutline, mailOutline, logoFacebook, logoInstagram, logoTwitter } from 'ionicons/icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButton, 
    IonIcon, 
    CommonModule, 
    FormsModule
  ]
})
export class AboutPage implements OnInit {
  private navCtrl = inject(NavController);

  constructor() {
    addIcons({ arrowBackOutline, cafeOutline, mailOutline, logoFacebook, logoInstagram, logoTwitter });
  }

  ngOnInit() {}

  goBack() {
    this.navCtrl.navigateRoot('/home');
  }
}
