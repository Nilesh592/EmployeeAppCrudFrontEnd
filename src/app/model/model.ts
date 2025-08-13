export type InputType = 'text' | 'number' | 'email' | 'password';
export type DropdownModel = {
  name: string;
  value: any;
  isSelected?: boolean;
};

export type EmployeeModel = {
  id: number;
  employeeName: string;
  salary: number;
  email: string;
  dateOfBirth: string;
  payrollType: number;
  uploadPicture: string;
};

export interface ServiceResponseDto<T> {
  data: T;
  message: string;
  success: boolean;
}