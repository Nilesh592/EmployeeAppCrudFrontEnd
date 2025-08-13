import { Component } from '@angular/core';
import { DropdownModel, EmployeeModel } from '../../model/model';
import { EmployeeService } from '../../service/employee.service';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  employeeList: EmployeeModel[] = [];
  payrollTypes: DropdownModel[] = [
    { value: 1, name: 'Permanent' },
    { value: 2, name: 'Temporary' },
  ];
  selectedRows: any[] = [];
  link = environment.apiUrl;

  constructor(private employeeService: EmployeeService, private router: Router,) { }

  ngOnInit(): void {
    this.searchEmployeeList();
  }

  searchEmployeeList() {
    this.employeeService.getList().subscribe((res) => {
      if (res.success) {

        console.log(res)
        this.employeeList = res.data;
      }
    });
  }

  addNew() {
    this.router.navigate(['/employee-create'], {
      queryParams: { Id: 0, mode: 'Create' },
    });
  }

  onView(row: any) {
    console.log('View clicked:', row);
    if (row?.id) {
      this.router.navigate(['/employee-create'], {
        queryParams: { Id: row.id, mode: 'View' },
      });
    } else {
      alert('Invalid selection');
    }
  }

  onEdit(row: any) {
    console.log('Edit clicked:', row);
    if (row?.id) {
      this.selectedRows = [row];
      console.log('Selection changed:', this.selectedRows);
      this.employeeService.selectedEmployeeDetails(
        this.selectedRows
      );
      this.router.navigate(['/employee-create'], {
        queryParams: { Id: row.id, mode: 'Update' },
      });
    } else {
      alert('Invalid selection');
    }
  }

  onDelete(row: any) {
    if (!row?.id) {
      return;
    }

    const confirmDelete = confirm('Do you want to delete this employee?');

    if (confirmDelete) {
      this.employeeService.delete(row.id).subscribe({
        next: () => {
          alert('Employee deleted successfully');
          this.searchEmployeeList();
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          alert('Failed to delete employee.');
        },
      });
    }
  }
}
