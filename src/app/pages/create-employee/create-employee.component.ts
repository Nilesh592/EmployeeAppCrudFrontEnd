import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModel, EmployeeModel } from '../../model/model';
import { CmnContainerComponent } from '../../common-components/cmn-container/cmn-container.component';
import { CmnButtonComponent } from '../../common-components/cmn-button/cmn-button.component';
import { CmnDatePickerComponent } from '../../common-components/cmn-date-picker/cmn-date-picker.component';
import { CmnInputComponent } from '../../common-components/cmn-input/cmn-input.component';
import { CmnLabelComponent } from '../../common-components/cmn-label/cmn-label.component';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-create-employee',
  imports: [
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {

  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute, private router: Router,
  ) { }


  formGroup!: FormGroup;
  duplicateMobileError: string = '';
  payrollTypes: DropdownModel[] = [
    { value: 1, name: 'Permanent' },
    { value: 2, name: 'Temporary' },
  ];
  maxFileSize = 150 * 1024; // 150KB in bytes
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  isEditing: boolean = false;
  mode: 'Create' | 'Update' | 'View' = 'Create';
  purchaseData = null;
  employeeId: number = 0;
  private subscription!: Subscription;
  selectedRows: any[] = [];
  EmployeeImage:any;
  SelectedFiles: any;


  ngOnInit(): void {
    console.log(this.payrollTypes)
    this.formGroup = new FormGroup({
      employeeName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      salary: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^\d*\.?\d*$/) // Allow decimals
      ]),
      email: new FormControl('', [
        Validators.required, 
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]),
      dateOfBirth: new FormControl('', [
        Validators.required,
        (control) => {
          const birthDate = new Date(control.value);
          const today = new Date();
          const minAge = 16;
          const minDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
          return birthDate <= minDate ? null : { underage: true };
        }
      ]),
      payrollType: new FormControl<DropdownModel | null>(null, [
        Validators.required
      ]),
      uploadPicture: new FormControl('', [
        Validators.required
      ])
    });

    this.route.queryParams.subscribe((params: any) => {
      debugger;
      console.log('Query Params:', params);
      if (params.Id && params.mode === 'View') {
        this.mode = 'View';
        this.subscription = this.employeeService.selectedRows$.subscribe(rows => {
          this.selectedRows = rows;
        });
        this.purchaseData = params;
        this.patchFormWithData(params.Id);
        this.formGroup.disable();
      } else if (params.Id && params.mode === 'Update') {
        this.mode = 'Update';
        this.purchaseData = params;
        this.isEditing = true;
        this.employeeId = params.Id;
        this.subscription = this.employeeService.selectedRows$.subscribe(rows => {
          console.log(rows)
          this.selectedRows = rows;
          console.log(this.selectedRows)
        });

        console.log(this.subscription)
        this.patchFormWithData(params.Id);
      } else {
        this.mode = 'Create';
        this.employeeId = 0;

      }
    });
  }

  listPage() {
    this.router.navigate(['/employee-list'], {
    });
  }


  resetFileInput(): void {
    this.fileInput.nativeElement.value = '';
    this.formGroup.get('uploadPicture')?.setValue(null);
  }
  onFileSelected(event: Event): void {
    debugger;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Reset previous errors
      this.formGroup.get('uploadPicture')?.setErrors(null);

      // Validate file type
      if (!this.allowedFileTypes.includes(file.type)) {
        this.formGroup.get('uploadPicture')?.setErrors({ invalidType: true });
        return;
      }

      // Validate file size (150KB)
      if (file.size > this.maxFileSize) {
        this.formGroup.get('uploadPicture')?.setErrors({ maxSize: true });
        return;
      }

      // Update form control with the selected file
      this.formGroup.get('uploadPicture')?.setValue(file);

      // Optional: Preview the image (if needed)
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // You can use e.target.result for image preview, e.g., set it to an <img> src
        console.log('Image preview URL:', e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      // If no file is selected, reset the form control
      this.formGroup.get('uploadPicture')?.setValue(null);
    }
  }

  onSubmit(): void {
    debugger;
    
    console.log('Form Values:', this.formGroup.value);
    console.log('Form Validation:', this.formGroup.errors);

    if (this.formGroup.invalid) {
      
      Object.keys(this.formGroup.controls).forEach(key => {
        const control = this.formGroup.get(key);
        control?.markAsTouched();
        
        if (control?.errors) {
          console.log(`Validation errors for ${key}:`, control.errors);
        }
      });

      
      const errors = [];
      if (this.formGroup.get('dateOfBirth')?.errors?.['underage']) {
        errors.push('Employee must be at least 16 years old');
      }
      if (this.formGroup.get('uploadPicture')?.errors?.['invalidType']) {
        errors.push('Invalid file type for picture');
      }
      if (this.formGroup.get('uploadPicture')?.errors?.['maxSize']) {
        errors.push('Picture file size exceeds 150KB limit');
      }

      alert(errors.length > 0 ? errors.join('\n') : 'Please fill in all required fields correctly');
      return;
    }

    debugger;

    this.employeeService.uploadFiles(this.SelectedFiles).subscribe({
      next: (uploadedData: any) => {
        if (uploadedData.success) {
          console.log("Upload", uploadedData);
          
          
          const uploadedFilePath = uploadedData.data[0];

          console.log(uploadedFilePath)
          
            this.formGroup.patchValue({
              uploadPicture: String(uploadedFilePath),
            });
          
        } else {
          console.error("Upload failed:", uploadedData.message);
        }
      },
      error: (err) => {
        console.error("Upload error:", err);
      }
    });
    debugger;

    const payload: EmployeeModel = {
      id: Number(this.employeeId),
      employeeName: this.formGroup.get('employeeName')?.value,
      salary: this.formGroup.get('salary')?.value,
      email: this.formGroup.get('email')?.value,
      dateOfBirth: this.formGroup.get('dateOfBirth')?.value,
      payrollType: Number(this.formGroup.get('payrollType')?.value),
      uploadPicture: this.formGroup.get('uploadPicture')?.value ?? "",
    };

    // Validate required fields
    if (!payload.employeeName || !payload.salary || !payload.email ||
      !payload.dateOfBirth || !payload.payrollType) {
      alert('All fields are required');
      console.error('All fields are required');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      alert('Invalid email format');
      console.error('Invalid email format');
      return;
    }

    // Validate salary is positive
    if (payload.salary <= 0) {
      alert('Salary must be greater than 0');
      console.error('Salary must be greater than 0');
      return;
    }
    debugger;

    if (this.isEditing && this.employeeId !== null) {
      const updateData = {
        ...payload,
      };

      this.employeeService.update(updateData).subscribe((res) => {
      if (res.success) {
        alert('Employee data updated successfully');
        console.log(res);
        this.formGroup.reset();
        this.resetFileInput();
        this.router.navigate(['/employee-create']);
      } else {
        alert('Employee creation failed');
      }
    });
    } else {
      this.employeeService.update(payload).subscribe((res) => {
      if (res.success) {
        alert('Employee created successfully');
        console.log(res);
        this.formGroup.reset();
        this.resetFileInput();
      } else {
        alert('Employee creation failed');
      }
    });
    }
    this.employeeService.create(payload).subscribe((res) => {
      if (res.success) {
        alert('Employee created successfully');
        console.log(res);
        this.formGroup.reset();
        this.resetFileInput();
      } else {
        alert('Employee creation failed');
      }
    });
  }

  patchFormWithData(data: any) {
    debugger;
    console.log('Input Data:', data);

    const Data = this.selectedRows;

    console.log(this.payrollTypes)

    this.employeeId = data;
    this.formGroup.patchValue({
      employeeName: Data[0].employeeName,
      salary: Data[0].salary,
      email: Data[0].email,
      dateOfBirth: new Date(Data[0].dateOfBirth).toISOString().split('T')[0],
      payrollType: Data[0].payrollType,
      uploadPicture: Data[0].uploadPicture
      })
  }

  onImageUpload(event:any){
     var file = event.target.files;
     this.SelectedFiles = Array.from(event.target.files);
      var reader = new FileReader();
      reader.onload = (e:any)=>{
        this.EmployeeImage = e.target.result;
      }
      reader.readAsDataURL(file[0]);
  }
}
