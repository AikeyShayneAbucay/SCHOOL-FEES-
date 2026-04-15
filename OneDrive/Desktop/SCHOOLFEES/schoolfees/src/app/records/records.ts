import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './records.html',
  styleUrls: ['./records.css']
})
export class Records implements OnInit {

  searchId: string = '';

  records = [
    {
      studentId: '2024-001',
      name: 'Juan Dela Cruz',
      course: 'BSIT',
      year: '2',
      fee: 'Tuition',
      amount: 3000,
      description: 'Partial Payment',
      method: 'Cash',
      balance: 2000,
      status: 'Pending',
      date: 'March 10, 2026'
    },
    {
      studentId: '2024-002',
      name: 'Maria Santos',
      course: 'BSBA',
      year: '1',
      fee: 'Misc Fee',
      amount: 5000,
      description: 'Full Payment',
      method: 'GCash',
      balance: 0,
      status: 'Paid',
      date: 'March 9, 2026'
    }
  ];

  filteredRecords: any[] = [];
  selectedRecord: any = null;
  selectedIndex: number = -1;

  errorMessage: string = '';

  // LOAD DATA
  ngOnInit() {
    const data = localStorage.getItem('records');

    if (data) {
      this.records = JSON.parse(data);
    } else {
      this.saveToStorage();
    }

    this.filteredRecords = [...this.records];
  }

  // SAVE
  saveToStorage() {
    localStorage.setItem('records', JSON.stringify(this.records));
  }

  // SEARCH
  
searchStudent() {
  if (!this.searchId) {
    this.filteredRecords = this.records;
    return;
  }

  const searchLower = this.searchId.toLowerCase();

  this.filteredRecords = this.records.filter(record =>
    record.studentId.toLowerCase().includes(searchLower) ||
    record.name.toLowerCase().includes(searchLower)
  );
}

  // EDIT
  editRecord(record: any, index: number) {
    this.selectedRecord = { ...record };
    this.selectedIndex = index;
  }

  saveEdit() {

    const error = this.validateRecord(this.selectedRecord);
    if (error) {
      this.errorMessage = error;
      return;
    }

    this.errorMessage = '';

    this.filteredRecords[this.selectedIndex] = this.selectedRecord;
    this.records = [...this.filteredRecords];

    this.saveToStorage();
    this.selectedRecord = null;
  }

  cancelEdit() {
    this.selectedRecord = null;
  }

  // DELETE
  deleteRecord(index: number) {
    const confirmDelete = confirm("Are you sure you want to delete?");
    
    if (confirmDelete) {
      this.filteredRecords.splice(index, 1);
      this.records = [...this.filteredRecords];
      this.saveToStorage();
    }
  }

  // ADD FORM
  showAddForm: boolean = false;

  newRecord: any = {
    studentId: '',
    name: '',
    course: '',
    year: '',
    fee: '',
    amount: 0,
    description: '',
    method: '',
    balance: 0,
    status: '',
    date: ''
  };

  openAddForm() {
    this.showAddForm = true;
  }

  closeAddForm() {
    this.showAddForm = false;
  }

  // ADD RECORD
  addRecord() {

    const error = this.validateRecord(this.newRecord);
    if (error) {
      this.errorMessage = error;
      return;
    }

    this.errorMessage = '';

    this.records.push({ ...this.newRecord });
    this.filteredRecords = [...this.records];

    this.saveToStorage();

    this.newRecord = {
      studentId: '',
      name: '',
      course: '',
      year: '',
      fee: '',
      amount: 0,
      description: '',
      method: '',
      balance: 0,
      status: '',
      date: ''
    };

    this.showAddForm = false;
  }

  // VALIDATION
  validateRecord(record: any): string {

    const nameRegex = /^[A-Za-z\s]+$/;
    const numberRegex = /^[0-9]+$/;
    const methodRegex = /^(Cash|GCash)$/i;
    const statusRegex = /^(Paid|Partial)$/i;

    if (!record.studentId || !record.name || !record.course || !record.year || !record.amount || !record.method || !record.status) {
      return "⚠️ Please fill out all required fields!";
    }

    if (!numberRegex.test(record.studentId)) {
      return "Student ID must be numbers only!";
    }

    if (!nameRegex.test(record.name)) {
      return "Name must be letters only!";
    }

    if (!nameRegex.test(record.course)) {
      return "Course must be letters only!";
    }

    if (!numberRegex.test(record.year)) {
      return "Year must be a number!";
    }

    if (!nameRegex.test(record.fee)) {
      return "Fee must be a word!";
    }

    if (record.description && !nameRegex.test(record.description)) {
      return "Description must be letters only!";
    }

    if (!methodRegex.test(record.method)) {
      return "Payment must be Cash or GCash only!";
    }

    if (isNaN(record.balance)) {
      return "Balance must be a number!";
    }

    if (!statusRegex.test(record.status)) {
      return "Status must be Paid or Pending only!";
    }

    return '';
  }
}