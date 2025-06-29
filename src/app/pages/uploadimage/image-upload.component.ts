import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-upload.html',
  styleUrls: ['./image-upload.css']
})
export class ImageUploadComponent {
  imagePreview: string | ArrayBuffer | null = null;

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    } else {
      alert("Please select a PNG or JPEG image.");
    }
  }

  triggerCamera(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    } else {
      alert("Please drop a valid PNG or JPEG image.");
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
    console.log("Submitting image...");
    // TODO: Add API call or routing logic here
  }
}
