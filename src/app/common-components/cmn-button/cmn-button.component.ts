import { CommonModule } from '@angular/common';
import { Component, Input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cmn-button',
  imports: [FormsModule, CommonModule],
  templateUrl: './cmn-button.component.html',
  styleUrl: './cmn-button.component.css'
})
export class CmnButtonComponent {
  @Input() variant:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'search'
    | 'newBtn'
    | 'success' = 'primary';
  @Input() buttonType: 'reset' | 'button' | 'submit' = 'button';
  @Input() disabled: boolean = false;
  isProcessing = model(false);

}
