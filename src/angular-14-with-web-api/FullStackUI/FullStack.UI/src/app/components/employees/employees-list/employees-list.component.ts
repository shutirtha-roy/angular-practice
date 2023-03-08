import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})

export class EmployeesListComponent implements OnInit {

  employees: Employee[] = [
    {
       id: '1cedbe4f-96ae-443b-9df1-74de429cf9da',
       name: 'John Doe',
       email: 'john.doe@email.com',
       phone: 998877665,
       salary: 60000,
       department: 'HR'
    },
    {
      id: '51d1aeb2-cc58-4601-9be5-383ae888e3e2',
      name: 'Samin Yasar',
      email: 'samin.yasar@email.com',
      phone: 895577665,
      salary: 70000,
      department: 'Marketing'
   }
  ];

  constructor() {

  }

  ngOnInit(): void {
      
  }
}