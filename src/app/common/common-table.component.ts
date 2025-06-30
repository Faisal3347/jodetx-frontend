import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-common-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.css']
})
export class CommonTableComponent {
  @Input() headers: string[] = []; 
  @Input() data: any[] = [];

  get displayedColumns(): string[] {
    return this.headers.map(header => this.sanitizeKey(header));
  }

  sanitizeKey(header: string): string {
    return header.toLowerCase().replace(/\s+/g, '');
  }

  getCellValue(row: any, header: string): any {
    const key = this.sanitizeKey(header);
    return row[key];
  }
}
