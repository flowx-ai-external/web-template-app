import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FlxHeaderComponent } from './components/header/header.component';

@Component({
  selector: 'flx-root',
  imports: [RouterOutlet, FlxHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
