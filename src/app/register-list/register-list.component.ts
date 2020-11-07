import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.css']
})
export class RegisterListComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private alertService: AlertService
  ) { 
      
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          name: ['', Validators.required],
          email: ['', Validators.required],
          phone: ['', Validators.required],
          city: ['', [Validators.required]]
      });
      this.getAllDetails();
  }

  registerList:any ;
  getAllDetails(){
    
    this.userService.getregisterList().subscribe((data: any) => {   
      console.log('fetched data',data);
      this.registerList = data;      
      //this.alertService.success('get all data successfully fetched', true);
      
    },
    error => {
        this.alertService.error(error);
        this.loading = false;
    });
  }

  deleteUser(id: number) {
      this.userService.deleteRegList(id).pipe(first()).subscribe(() => {
          this.getAllDetails()
      });
  }

  cancelForm(){
    this.registerForm.reset();
  }
  

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
        //this.alertService.error('Please fill all input fields');
          return;
          
      }

      console.log("this.registerForm.value..",this.registerForm.value);
    
       this.userService.registerList(this.registerForm.value).subscribe((data: any) => {          
          this.alertService.success('Registration List created successful', true);
          this.router.navigate(['/register-list']);
          this.getAllDetails();
          
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
  }

}
