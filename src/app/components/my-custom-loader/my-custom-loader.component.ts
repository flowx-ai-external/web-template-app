import { Component, input } from '@angular/core';

@Component({
  selector: 'app-custom-loader',
  templateUrl: './my-custom-loader.component.html',
  styleUrls: ['./my-custom-loader.component.scss']
})
export class CustomLoaderComponent {
   text = input('Loading...');
}