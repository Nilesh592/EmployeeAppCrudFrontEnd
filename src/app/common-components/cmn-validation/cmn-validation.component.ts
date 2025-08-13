import { CommonModule } from '@angular/common';
import { Component, input, Input, SimpleChanges } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-cmn-validation',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cmn-validation.component.html',
  styleUrl: './cmn-validation.component.css'
})
export class CmnValidationComponent {
control = input.required<FormControl>();
  @Input() errors: Record<string, ValidationErrors> | null = {};
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() public isSubmitted = false;
  errorMessages: Record<string, string> = {
    required: 'This field is required',
    email: 'Invalid email address',
  };

  ngOnChanges(changes: SimpleChanges): void {
    const { customErrorMessages } = changes;
    if (customErrorMessages) {
      this.errorMessages = {
        ...this.errorMessages,
        ...customErrorMessages.currentValue,
      };
    }
  }
}
