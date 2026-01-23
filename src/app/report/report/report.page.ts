import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel, MenuController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, cafeOutline, restaurantOutline, analyticsOutline, optionsOutline } from 'ionicons/icons';
import { ReportService, OrderReport } from '../../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel]
})
export class ReportPage implements OnInit {
  reports: OrderReport[] = [];
  pageTitleChars = 'Report'.split('');

  constructor(private reportService: ReportService, private menuCtrl: MenuController) {
    addIcons({
      'home': homeOutline,
      'cafe': cafeOutline,
      'restaurant': restaurantOutline,
      'analytics': analyticsOutline,
      'options-outline': optionsOutline,
      'analytics-outline': analyticsOutline
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
