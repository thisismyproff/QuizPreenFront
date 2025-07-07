import { Component } from '@angular/core';
import { UserService } from './../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { error } from 'console';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent  {
  constructor(private userService:UserService,private snack:MatSnackBar){}

  hide = true;
   user={
    username:'',
    password:'',
    name:'',
    email:'',
    phone:''
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

  formSubmit() { 
    if (this.user.password.length < 8 || !this.hasSpecialChars(this.user.password)) {
      this.snack.open("Password does not follow the guidlines!",'Ok')
    }
    else {
      this.userService.addUser(this.user).subscribe(
      (data:any) => {
        if (data.error != null) {
          this.snack.open(data.error,'Ok!',{
            duration:5000,
          })
        } else {
        Swal.fire("Signup Success","Your registration is success","success");
        }
      },
      (error) => {
        this.snack.open("Something went wrong",'',{
          duration:3000,
        })
      }
    );}
  }
}
