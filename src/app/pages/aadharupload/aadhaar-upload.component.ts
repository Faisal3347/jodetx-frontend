import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CommonTableComponent } from '../../common/common-table.component';

@Component({
  selector: 'app-aadhaar-upload',
  standalone: true,
  imports: [CommonModule, CommonTableComponent],
  templateUrl: './aadhaar-upload.html',
  styleUrls: ['./aadhaar-upload.css']
})
export class AadhaarUploadComponent implements OnInit {
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  tableHeaders = ['SR No', 'Aadhaar Number', 'DOB', 'View Aadhaar'];
  tableData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAadhaarDetails();
  }

  triggerCamera(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    } else {
      alert('Only PNG or JPEG images are allowed.');
    }
  }

  removeImage(): void {
    this.imagePreview = null;
    this.selectedFile = null;
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      alert('Please upload an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:3000/aadhaar/upload', formData, {
      withCredentials: true
    }).subscribe({
      next: () => {
        alert('Upload successful!');
        this.removeImage();
        this.loadAadhaarDetails();
      },
      error: (err) => {
        alert('Upload failed');
        console.error(err);
      }
    });
  }

  loadAadhaarDetails(): void {
    this.http.get<any>('http://localhost:3000/aadhaar/details', {
      withCredentials: true
    }).subscribe({
      next: (res) => {
        this.tableData = res.data?.map((item: any, index: number) => ({
          srNo: index + 1,
          aadhaarNumber: item.aadhaarNumber,
          dob: item.dob,
          viewLink: item.aadhaarUrl
        })) || [];
      },
      error: (err) => {
        console.error('Error loading Aadhaar data', err);
      }
    });
  }
}
