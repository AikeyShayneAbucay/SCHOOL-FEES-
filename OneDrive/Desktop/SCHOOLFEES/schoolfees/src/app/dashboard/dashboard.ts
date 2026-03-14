import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent {
  welcome = '';
  roleText = '';
  isTreasurer = false;
  isAdmin = false;
  

  studentId = '';
  studentName = '';
  course = '';
  yearLevel = '';
  feeName = '';
  feeAmount: number | null = null;
  description = '';
  paymentMethod = '';
  amountPaid: number | null = null;
  paymentStatus = '';
  paymentDate = '';

  records: any[] = [];
  historyRecords: any[] = [];
  currentHistoryStudentId = '';
  searchId = '';

  constructor(private router: Router) {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.welcome = `Welcome, ${user.first_name || ''}`;
    this.roleText = user.role || '';
    this.isTreasurer = user.role === 'treasurer';
    this.isAdmin = user.role === 'admin';
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  saveRecord() {
    this.records.push({
      studentId: this.studentId,
      name: this.studentName,
      course: this.course,
      year: this.yearLevel,
      fee: this.feeName,
      feeAmt: this.feeAmount,
      desc: this.description,
      method: this.paymentMethod,
      paid: this.amountPaid,
      status: this.paymentStatus,
      date: this.paymentDate,
    });
    localStorage.setItem('records', JSON.stringify(this.records));
    alert('Record saved!');
  }

  searchRecord() {
    const recs = JSON.parse(localStorage.getItem('records') || '[]');
    this.records = recs.filter((r: any) => r.studentId === this.searchId);
  }

  displayRecords() {
    this.records = JSON.parse(localStorage.getItem('records') || '[]');
  }

  deleteRecord(index: number) {
    this.records.splice(index, 1);
    localStorage.setItem('records', JSON.stringify(this.records));
  }

  editRecord(index: number) {
    const r = this.records[index];
    this.studentId = r.studentId;
    this.studentName = r.name;
    this.course = r.course;
    this.yearLevel = r.year;
    this.feeName = r.fee;
    this.feeAmount = r.feeAmt;
    this.description = r.desc;
    this.paymentMethod = r.method;
    this.amountPaid = r.paid;
    this.paymentStatus = r.status;
    this.paymentDate = r.date;
  }

  viewHistory(studentId: string) {
    const recs = JSON.parse(localStorage.getItem('records') || '[]');
    this.currentHistoryStudentId = studentId;
    this.historyRecords = recs.filter((r: any) => r.studentId === studentId);
  }

  closeHistory() {
    this.historyRecords = [];
    this.currentHistoryStudentId = '';
  }
}