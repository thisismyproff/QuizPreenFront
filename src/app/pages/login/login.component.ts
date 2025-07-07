import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginData={
    username:'',
    password:''
  };
  hasSpecialChars(str:any) {
    const specialChars = '!@#$%^&*()_+\-=\[\]{};';
    for (let char of str) {
      if (specialChars.indexOf(char) !== -1) {
        return true;
      }
    }
    return false;
  }

  formSubmit(){
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open("Invalid Username",'',{duration:3000});
      return
    }
    
    if (this.loginData.password.length < 8 || !this.hasSpecialChars(this.loginData.password)) {
      this.snack.open("Password does not follow the guidlines!",'Ok')
      return
    }
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginService.setUser(user);
            if (this.loginService.getUserRole() == 'ADMIN') {
              this.navigateTo('/admin-dashboard');
            } else if (this.loginService.getUserRole() == 'NORMAL') {
              this.navigateTo('/user-dashboard/loadQuiz/0');
            } else {
              this.loginService.logout();
            }
          }
        )
      },
      (error) => {
        this.snack.open("Invalid Username or Password!","Ok",{duration:5000})
      }
    );
    
  }
  navigateTo(path: string) {
    // Clear history and navigate to the specified path
    window.history.replaceState({}, document.title, path);
    window.location.href = path;
  }
  constructor(private snack:MatSnackBar,public loginService:LoginService,private location: Location) { }

  ngOnInit() {
  }

}
