import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  categories:any ;
  quiz={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:false,
    category:null

  }

  constructor(private categoryService:CategoryService, private snack:MatSnackBar, 
    private quizService:QuizService, private router:Router) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        Swal.fire("Error","Error in loading data","error");
      }
    )
  }
  formSubmit(){

    if (this.quiz.category == null  || this.quiz.category == '') {
        this.snack.open("Please select Category of Quiz","Ok")
        return 
    }
  
    this.quizService.addQuiz(this.quiz).subscribe(
      (data:any) => {
        if (data.error != null) {
          this.snack.open(data.error,'Ok!',{
            duration:5000,
          })
        } else {
          const snackBarRef=this.snack.open("Quiz Added Successfully",'Ok!',{
            duration:5000,
          })
          snackBarRef.onAction().subscribe(() => {
            this.router.navigate(['/admin-dashboard/quizzes']); // Replace with your target route
          });
        }
      },
      (error) => {
        this.snack.open("Something went wrong",'',{
          duration:3000,
        })
      }
    );


  }
}
