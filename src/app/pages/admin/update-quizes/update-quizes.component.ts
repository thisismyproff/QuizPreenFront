import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import  swal from 'sweetalert2'

@Component({
  selector: 'app-update-quizes',
  templateUrl: './update-quizes.component.html',
  styleUrls: ['./update-quizes.component.css']
})
export class UpdateQuizesComponent implements OnInit {

  constructor(private route:ActivatedRoute , private quizService:QuizService,
    private categoryService:CategoryService, private snack:MatSnackBar, private router:Router) { }

  quizId:number=0;
  quizData:any
  categories:undefined ;

  ngOnInit(): void {
    this.quizId=this.route.snapshot.params['quizId'];

    this.quizService.getQuizById(this.quizId).subscribe(
      (data:any)=>{
        this.quizData=data;
        this.categoryService.categories().subscribe(
          (data:any)=>{
            this.categories=data;
          },
          (error)=>{
            swal.fire("Error","Error in loading data","error");
          }
        )
    
      },
      (error)=>{
        swal.fire("Error","Something went wrong","error")
      }
    );



  }

  formSubmit(){

    if (this.quizData.category == null  || this.quizData.category == '') {
        this.snack.open("Please select Category of Quiz","Ok")
        return 
    }
    this.quizService.updateQuiz(this.quizData).subscribe(
      (data:any) => {
        if (data.error != null) {
          this.snack.open(data.error,'Ok!',{
            duration:5000,
          })
        } else {
          const snackBarRef=this.snack.open("Quiz Updated Successfully",'Ok!')
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
