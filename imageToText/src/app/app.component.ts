import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhotoUploadComponent } from "./photo-upload/photo-upload.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PhotoUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'imageToText';
}
