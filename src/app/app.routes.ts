import { Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';

export const routes: Routes = [
    { path: '', redirectTo: 'employee-list', pathMatch: 'full' },
    { path: 'employee-list', component: EmployeeListComponent },
    { path: 'employee-create', component: CreateEmployeeComponent },
]
