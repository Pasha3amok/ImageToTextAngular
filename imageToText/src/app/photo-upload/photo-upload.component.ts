import { DecimalPipe, JsonPipe, NgClass, NgFor, NgIf} from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../environments/environment';
import { ClipboardModule  } from "@angular/cdk/clipboard";

@Component({
  selector: 'app-photo-upload',
  standalone: true,
  imports: [NgIf, NgFor, NgClass,FileUploadModule,DecimalPipe, JsonPipe, ClipboardModule],
  templateUrl: './photo-upload.component.html',
  styleUrl: './photo-upload.component.scss'
})
export class PhotoUploadComponent implements OnInit {
  uploader?: FileUploader;
  hasBaseDropzoneOver = false;
  previewUrl = signal<string | ArrayBuffer | null>(null);
  recognizedText = signal<any>(null);
  textForCopy = signal<any>(null);

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e:any){
    this.hasBaseDropzoneOver = e;
  }

  initializeUploader(){
  this.uploader = new FileUploader({
    url: environment.apiUrl,
    headers: [
        { name: 'X-Api-Key', value: environment.apiKey }
      ],
    itemAlias: 'image',
    isHTML5: true,
    allowedMimeType: ['image/png', 'image/jpeg'],
    removeAfterUpload: true,
    autoUpload: false,
    maxFileSize: 2 * 1024 * 1024
  });

  this.uploader.onAfterAddingFile = (file) => {
    file.withCredentials = false;
    this.recognizedText.set(null);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl.set(e.target.result);
    }
    reader.readAsDataURL(file._file);

  }

  this.uploader.onSuccessItem = (item, response,status,headers) =>{
    const text = JSON.parse(response);
    this.recognizedText.set(text);
    this.updateTextForCopy(text);
  }
}
updateTextForCopy(items: any[]): void {
  this.textForCopy.set( items.map(item => item.text).join(' '));

}

}
