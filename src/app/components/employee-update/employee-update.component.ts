import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  employee: Employee = new Employee();
  submitted: boolean = false;
  id: any;
  departments: Department[] = [];

  constructor(private fb: FormBuilder,
    private employeeService: EmployeeService,
    private activatedroute: ActivatedRoute,
    private departmentService: DepartmentService,
    private router: Router) {

  }
  updateForm: FormGroup = this.fb.group({
    firstName: [this.employee.firstName, [Validators.required, Validators.minLength(5)]],
    lastName: [this.employee.lastName],
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
  ngOnInit(): void {
    let sub = this.activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
      console.log(this.id);
      this.getDepartments();
      this.findEmployee(this.id);

    });
  }
  findEmployee(id: any) {
    this.employeeService.getEmployeeById(id).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.employee = res;
          //this.router.navigateByUrl('employee-list')
          this.updateForm.patchValue({
            firstName: this.employee.firstName,
            lastName: this.employee.lastName,
            department: {
              departmentId: this.employee.department?.departmentId
            },
            address: {
              street: this.employee.address?.street,
              city: this.employee.address?.city,
              state: this.employee.address?.state,
              country: this.employee.address?.country,
              zipCode: this.employee.address?.zipCode,
            }

          });

        },
        error: (err: Error) => console.error('Error in find employee: ' + err),
        complete: () => console.log('Employee find completed')
      }

    );
  }

  onSubmit() {
    console.warn(this.updateForm.value);
    this.submitted = true;
    console.log(this.id);
    this.employeeService.update(this.id, this.updateForm.value).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('employee-list')
        },
        error: (err: Error) => console.error('Error in update employee: ' + err),
        complete: () => console.log('Employee update opleted')
      }

    );
  }

  getDepartments() {
    this.departmentService.findAll().subscribe({
      next: (res) => {
        console.log(res);
        this.departments = res;
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification')
    })
  }
  get updateFormControls() {
    return this.updateForm.controls;
  }
  get departmentControls() {
    return ((this.updateForm.get('department') as FormGroup).controls)
  }
  get addressControls() {
    return ((this.updateForm.get('address') as FormGroup).controls)
  }
}
