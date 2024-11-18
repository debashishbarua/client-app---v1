import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  submitted: boolean = false;
  departments: Department[] = [];

  constructor(private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router) { }

  ngOnInit(): void {
    this.submitted = false;
    this.getDepartments();
  }
  employeeSaveForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(5)]],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      country: [''],
      zipCode: [''],
    }),
    department: this.fb.group({
      departmentId: ['', Validators.required],
    })
  });
  onSubmit() {
    console.warn(this.employeeSaveForm.value);
    this.submitted = true;
    this.employeeService.create(this.employeeSaveForm.value).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('employee-list')
        },
        error: (err: Error) => console.error('Error in create employee: ' + err),
        complete: () => console.log('Employee created')
      }

    );
  }

  getDepartments() {
    this.departmentService.findAll().subscribe({
      next: (res) => {
        console.log(res);
        this.departments = res;
      },
      error: (err: Error) => console.error('Get department got an error: ' + err),
      complete: () => console.log('Get department got a complete notification')
    })
  }
  get employeeSaveFormControls() {
    return this.employeeSaveForm.controls;
  }
  get departmentControls() {
    return ((this.employeeSaveForm.get('department') as FormGroup).controls)
  }
  get addressControls() {
    return ((this.employeeSaveForm.get('address') as FormGroup).controls)
  }
}
