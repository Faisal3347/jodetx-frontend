import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonTableComponent } from '../../common/common-table.component';

@Component({
  selector: 'app-aadhaar-upload',
  standalone: true,
  imports: [CommonModule, CommonTableComponent],
  templateUrl: './aadhaar-upload.html',
  styleUrls: ['./aadhaar-upload.css']
})
export class AadhaarUploadComponent {
  imagePreview: string | ArrayBuffer | null = null;
  tableHeaders = ['Name', 'DOB', 'Aadhaar Number'];
tableData = [
  { name: 'Faisal Khan', dob: '1995-06-01', aadhaarnumber: '1234-5678-9123' },
  { name: 'Ayesha Shaikh', dob: '1998-11-12', aadhaarnumber: '2345-6789-1234' },
  { name: 'Rahul Singh', dob: '1992-03-08', aadhaarnumber: '3456-7891-2345' },
  { name: 'Sneha Patil', dob: '1990-07-22', aadhaarnumber: '4567-8912-3456' },
  { name: 'Zainab Khan', dob: '2001-01-15', aadhaarnumber: '5678-9123-4567' },
  { name: 'Vikram Mehta', dob: '1988-05-03', aadhaarnumber: '6789-1234-5678' },
  { name: 'Meena Joshi', dob: '1996-09-27', aadhaarnumber: '7891-2345-6789' },
  { name: 'Imran Shaikh', dob: '1993-02-14', aadhaarnumber: '8912-3456-7891' },
  { name: 'Pooja Sharma', dob: '1999-06-30', aadhaarnumber: '9123-4567-8912' },
  { name: 'Sameer Ansari', dob: '1987-10-20', aadhaarnumber: '1234-5678-9012' }
];


  triggerCamera(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    } else {
      alert("Only PNG or JPEG images are allowed.");
    }
  }

  removeImage(): void {
    this.imagePreview = null;
  }

  onSubmit(): void {
    if (!this.imagePreview) {
      alert("Please upload an image first.");
      return;
    }

    
  }
}
