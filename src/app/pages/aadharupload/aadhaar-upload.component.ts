import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonTableComponent } from '../../common/common-table.component';
import { ApiService } from '../../services/services';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-aadhaar-upload',
  standalone: true,
  imports: [CommonModule, CommonTableComponent],
  templateUrl: './aadhaar-upload.html',
  styleUrls: ['./aadhaar-upload.css']
})
export class AadhaarUploadComponent {
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  tableHeaders = ['Sr', 'Aadhaar Number', 'DOB', 'Aadhaar URL'];
  tableData: any[] = [];
  responseMessage: string = ''; // ✅ New variable

  constructor(
    private api: ApiService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.fetchAadhaarDetails();
  }

  fetchAadhaarDetails(): void {
    this.api.getAadhaarDetails().subscribe({
      next: (res) => {
        if (res?.status === 'success' && Array.isArray(res.data)) {
          this.tableData = res.data.map((item, index) => ({
            sr: index + 1,
            aadhaarnumber: item.aadhaarNumber || "NA",
            dob: item.dob || "NA",
            aadhaarurl: item.aadhaarUrl
          }));
        }
      },
      error: (err) => {
        console.error('Failed to fetch Aadhaar details', err);
      }
    });
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
      this.responseMessage = "Only PNG or JPEG images are allowed.";
    }
  }

  removeImage(): void {
    this.imagePreview = null;
    this.selectedFile = null;
  }

  onSubmit(): void {
    this.responseMessage = ''; // clear message

    if (!this.selectedFile) {
      this.responseMessage = "Please upload an image first.";
      return;
    }

    const token = this.cookieService.get('auth_token');
    if (!token) {
      this.responseMessage = "User not authenticated.";
      return;
    }

    this.api.uploadAadhaarImage(this.selectedFile, token).subscribe({
      next: (res) => {
        this.responseMessage = res?.message || 'Aadhaar uploaded successfully!';
        this.imagePreview = null;
        this.selectedFile = null;
        this.fetchAadhaarDetails();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Upload failed', err);
        this.responseMessage = err?.error?.message || 'Upload failed. Try again.';
      }
    });
  }
}
