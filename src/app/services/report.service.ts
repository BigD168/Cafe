import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './cart.service';

export interface OrderReport {
  items: CartItem[];
  totalPrice: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private reports: OrderReport[] = [];
  private reportsSubject = new BehaviorSubject<OrderReport[]>([]);

  constructor() { }

  addReport(items: CartItem[], totalPrice: number) {
    const report: OrderReport = {
      items: [...items],
      totalPrice: totalPrice,
      timestamp: new Date().toLocaleString()
    };
    this.reports.unshift(report); // Newest first
    this.reportsSubject.next(this.reports);
  }

  getReports() {
    return this.reportsSubject.asObservable();
  }
}
