import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CmnValidationComponent } from '../cmn-validation/cmn-validation.component';
import { CmnLabelComponent } from '../cmn-label/cmn-label.component';
import { ControlValueAccessorDirective } from '../directive';
import { InputType } from '../../model/model';

@Component({
  selector: 'app-cmn-input',
  imports: [CmnValidationComponent,
    CmnLabelComponent,
    ReactiveFormsModule,
    CommonModule,],
  templateUrl: './cmn-input.component.html',
  styleUrl: './cmn-input.component.css'
})
export class CmnInputComponent<T> extends ControlValueAccessorDirective<T> {
  @Input() placeholder = '';
  @Input() inputId = '';
  @Input() label = '';
  @Input() customLabel = '';
  @Input() type: InputType = 'text';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() isDisabled = false;
  @Input() isAstRequired = true;
  @Input() displayValue: string = '';
  @Input() value = '';
  @Input() inputstyleClass: string = '';

  override writeValue(value: any): void {
    this.value = value ?? '';
    this.displayValue = this.value;
    super.writeValue(this.value);
  }

  onInputChange(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.displayValue = newValue;
    this.value = newValue;

    // Notify Angular form of value change
    this._changed?.(newValue as T); // Fixed type casting
    this._onTouched?.(); // Use correct method name
  }
}

