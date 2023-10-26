import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public user_id;
  public isLoginLoad = false;
  public userName : string = 'user123';
  public userPassword : any = 'User@123';

  constructor(private fb: FormBuilder, private message: MessageService, private route: Router,
    private load: LoaderService, private user:UserService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  //Click to login the Dashboard Page (Login Functionality)
  login() {
    this.isLoginLoad = true;
    let val = {
      email: this.loginForm.value.userName.toLowerCase(),
      password: this.loginForm.value.password,
    }
    
    if((this.userName == this.loginForm.value.userName) && (this.userPassword == this.loginForm.value.password)) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', this.loginForm.value.userName);
      this.route.navigate([''])
      this.load.load(true);
      this.isLoginLoad = false;
      this.message.success('Successfully Login');
    }
    else {
      this.user.getUsers().subscribe((res:any)=>{
        res?.forEach((element:any) => {
          if((element?.name == this.loginForm.value.userName) && (element?.password == this.loginForm.value.password)) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', this.loginForm.value.userName);
            this.route.navigate([''])
            this.load.load(true);
            this.isLoginLoad = false;
            this.message.success('Successfully Login');
          }
        });
      })
    }
  }

  password = "password"
  i: any = "eye-invisible"
  iChange() {
    if (this.password == "password") {
      this.password = "text"
      this.i = "eye"
    }
    else {
      this.password = "password"
      this.i = "eye-invisible"
    }
  }
}
