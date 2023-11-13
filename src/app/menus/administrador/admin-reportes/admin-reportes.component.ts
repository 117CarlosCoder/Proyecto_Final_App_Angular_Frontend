import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-reportes',
  templateUrl: './admin-reportes.component.html',
  styleUrls: ['./admin-reportes.component.css']
})
export class AdminReportesComponent implements OnInit{
  formreporte1!:FormGroup;
  formreporte2!:FormGroup;
  formreporte3!:FormGroup;

  constructor(private formBuilder:FormBuilder){}

  ngOnInit(): void {
      this.formreporte1 = this.formBuilder.group({
        fechaA: [null, [Validators.required]],
        fechaB: [null, [Validators.required]],
      }); 
      this.formreporte2 = this.formBuilder.group({
        fechaA: [null, [Validators.required]],
        fechaB: [null, [Validators.required]],
      });
      this.formreporte3 = this.formBuilder.group({
        fechaA: [null, [Validators.required]],
        fechaB: [null, [Validators.required]],
      });

  }
}
