import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorDirective } from '../directive';
import { CmnLabelComponent } from '../cmn-label/cmn-label.component';

@Component({
  selector: 'app-cmn-date-picker',
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => CmnDatePickerComponent),
  //     multi: true,
  //   },
  // ],
  imports: [CommonModule, CmnLabelComponent],
  templateUrl: './cmn-date-picker.component.html',
  styleUrl: './cmn-date-picker.component.css'
})
export class CmnDatePickerComponent<T> extends ControlValueAccessorDirective<T> {
  @Input() label!: string;
  @Input() placeholder: string = 'dd-mm-yyyy';
  @Input() isAstRequired = true;
  @Input() errorMessage!: string;
  @Input() customErrorMessages: Record<string, string> = {};

  // Default container styles
  @Input() containerClass: string = 'relative w-full mt-1';

  // Default label styles
  @Input() labelClass: string = 'font-medium';

  // Default input styles - can be completely overridden
  @Input() inputClass: string =
    'block w-full px-4 py-2 mt-1 text-gray-700 bg-white border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500';

  @Input() minDate?: string;
  @Input() maxDate?: string;

  @Output() dateChange = new EventEmitter<string>();

  rawValue: string = ''; // YYYY-MM-DD for <input type="date">
  displayValue: string = ''; // DD MMM YYYY for showing in the UI

  override writeValue(value: string): void {
    this.rawValue = value || '';
    this.displayValue = this.formatDate(this.rawValue);
  }

  onDateChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.rawValue = inputElement.value;
    this.displayValue = this.formatDate(this.rawValue);

    // Enforce min/max date logic
    if (this.minDate && this.rawValue < this.minDate) {
      this.rawValue = this.minDate;
      this.displayValue = this.formatDate(this.rawValue);
    }
    if (this.maxDate && this.rawValue > this.maxDate) {
      this.rawValue = this.maxDate;
      this.displayValue = this.formatDate(this.rawValue);
    }

    // Use base class handlers
    if (this._changed) this._changed(this.rawValue as any);
    if (this._onTouched) this._onTouched();

    this.dateChange.emit(this.rawValue);
  }

  private formatDate(dateString: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ''; // Avoid errors for invalid dates

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
