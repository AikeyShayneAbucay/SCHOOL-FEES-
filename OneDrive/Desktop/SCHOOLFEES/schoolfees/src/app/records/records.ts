import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './records.html',
  styleUrls: ['./records.css']
})

export class Records {

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

  filteredRecords = [...this.records];

  searchStudent() {

    if(this.searchId === ''){
      this.filteredRecords = this.records;
      return;
    }

    this.filteredRecords = this.records.filter(record =>
      record.studentId.includes(this.searchId)
    );
  }

  deleteRecord(index:number){
    this.filteredRecords.splice(index,1);
  }

}