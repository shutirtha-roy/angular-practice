import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private userStore: UserStoreService,
    private resetService: ResetPasswordService) { 

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin() {
    if(this.loginForm.valid) {
      //Send the obj to database
      console.log(this.loginForm.value);

      this.auth.login(this.loginForm.value)
      .subscribe({
        next: (res) => {
          alert("Login Success");
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodeToken();
          this.userStore.setFullNameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          alert(err?.err.message)
        }
      })
    }

    //console.log(this.loginForm.value);
    //if not valid throw the error using toaster and required fields
    ValidateForm.validateAllFormFields(this.loginForm);
    //alert("Your form is invalid");
  }

  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^\S+@\S+\.\S+$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend() {
    if(this.checkValidEmail(this.resetPasswordEmail)) {
      console.log(this.resetPasswordEmail);
      
      //API Call to be done
      this.resetService.sendResetPasswordLink(this.resetPasswordEmail)
      .subscribe({
        next: (res) => {
          // this.toastr.success({
          //   detail: 'Success',
          //   summary: 'Reset Success!',
          //   duration: 3000,
          // })
          alert('Success, Reset Success!');
          this.resetPasswordEmail = "";
          const buttonRef = document.getElementById("closeBtn");
          buttonRef?.click();
        },
        error: (error) => {
          // this.toastr.error({
          //   detail: 'ERROR',
          //   summary: 'Something went wrong!',
          //   duration: 3000,
          // })
          alert('Error, something went wrong');
        }
      });
    }
  }
}
