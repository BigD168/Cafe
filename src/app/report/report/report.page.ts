import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel, MenuController, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, cafeOutline, restaurantOutline, analyticsOutline, optionsOutline, home, cafe, restaurant, analytics } from 'ionicons/icons';
import { ReportService, OrderReport } from '../../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel, IonGrid, IonRow, IonCol]
})
export class ReportPage implements OnInit {
  reports: OrderReport[] = [];
  pageTitleChars = 'Report'.split('');

  constructor(private reportService: ReportService, private menuCtrl: MenuController) {
    addIcons({
      home,
      cafe,
      restaurant,
      analytics,
      homeOutline,
      cafeOutline,
      restaurantOutline,
      analyticsOutline,
      optionsOutline
    });
  }

  ngOnInit() {
    this.reportService.getReports().subscribe(reports => {
      this.reports = reports;
    });
  }

  openMenu() {
    this.menuCtrl.open('start');
  }
}
