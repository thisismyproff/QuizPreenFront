import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  hide = true;
  username='';
  user:any;
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
      return
    }
    delete this.user.authorities;
    Swal.fire({
      icon:'info',
      title:'You will be logged out after performing this action,Are you sure you want to update your profile?',
      confirmButtonText:'Yes',
      showCancelButton:true,
      cancelButtonText:'No',
      cancelButtonColor:'red'
    }).then((result)=>{
      if (result.isConfirmed) {
        this.userService.updateUser(this.user).subscribe(
          (data:any) => {
            if (data.error != null) {
              this.snack.open(data.error,'Ok!',{
                duration:5000,
              })
              return
            }
            
          },
          (error) => {
            Swal.fire("Oops!","Something went wrong!","error")
          }
        )
        this.loginService.logout();
        this.user = null;
        window.location.reload();
      }
    })
    
    

  
  } 

  constructor(private userService:UserService,private route:ActivatedRoute,private snack:MatSnackBar,private loginService:LoginService) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params['username'];
    this.userService.getUser(this.username).subscribe(
      (data:any) => {
        this.user=data;
      },
      (error) => {
        Swal.fire("Oops!","Something went wrong!","error")
      }
    )
  }

}
