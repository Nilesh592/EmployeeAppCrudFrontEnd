import { inject, Injectable } from '@angular/core';
import { EmployeeModel, ServiceResponseDto } from '../model/model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }
  private baseUrl = environment.apiUrl;

  http = inject(HttpClient);

  private selectedRowsSubject = new BehaviorSubject<any[]>([]);
  selectedRows$: Observable<any[]> = this.selectedRowsSubject.asObservable();

  selectedEmployeeDetails(rows: any[]) {
    this.selectedRowsSubject.next(rows);
  }

  create(data: EmployeeModel): Observable<ServiceResponseDto<EmployeeModel>> {
    return this.http.post<ServiceResponseDto<EmployeeModel>>(this.baseUrl + 'PostEmployee', data);

  }

  update(data: EmployeeModel): Observable<ServiceResponseDto<EmployeeModel>> {
    return this.http.post<ServiceResponseDto<EmployeeModel>>(this.baseUrl + 'UpdateEmployee', data);
  }

  delete(id: number): Observable<ServiceResponseDto<EmployeeModel>> {
    return this.http.delete<ServiceResponseDto<EmployeeModel>>(this.baseUrl + 'DeleteEmployee/' + id);
  }

  getList(): Observable<ServiceResponseDto<EmployeeModel[]>> {
    return this.http.get<ServiceResponseDto<EmployeeModel[]>>(this.baseUrl + 'GetAllEmployee');
  }

  uploadFiles(files:any){
    var formD = new FormData();
    for (var i=0;i<files.length;i++){
      formD.append("files",files[i]);
    }
    return this.http.post(this.baseUrl+"UploadFiles",formD);
  }


}
