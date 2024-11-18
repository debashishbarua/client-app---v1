import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  message: string = '';
  constructor(private activatedroute: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService) {
  }
  ngOnInit(): void {
    let sub = this.activatedroute.paramMap.subscribe(params => {
      console.log(params);
      let id = params.get('id');
      console.log(id);
      this.deleteEployee(id);
    });
  }

  deleteEployee(id: any) {
    let text = "Press a button!\nEither OK or Cancel.";
    if (confirm(text) == true) {
      this.employeeService.delete(id).subscribe({
        next: (res) => {
          console.log(res);
          this.message = res;
          this.router.navigateByUrl('employee-list')
        },
        error: (err: Error) => console.error('Delete error: ' + err),
        complete: () => console.log('Delete complete notification')
      })
    } else {
      this.router.navigateByUrl('employee-list')
    }

  }
}
