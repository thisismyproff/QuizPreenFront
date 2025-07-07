import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizes:any

  constructor(private quiz:QuizService) { }

  ngOnInit(): void {
    this.quiz.Quizes().subscribe(
      (data:any)=>{
        this.quizes=data;
      },
      (error)=>{
        Swal.fire("Error","Error in loading data","error");
      }
    )
  }

  deleteQuiz(quizId:number){
    Swal.fire({
      icon:'warning',
      title:'Are you sure you want to delete this quiz?',
      confirmButtonText:'Delete',
      showCancelButton:true,
      cancelButtonText:'Cancel',
      cancelButtonColor:'red'
    }).then((result)=>{
      if (result.isConfirmed) {
        this.quiz.deleteQuiz(quizId).subscribe(
          (data:any)=>{
            Swal.fire("Sucess","Quiz is successfully deleted","success");
            this.quizes = this.quizes.filter((quiz:any) => quiz.quizId != quizId )
          },
          (error)=>{
            Swal.fire("Error","Error in loading data","error");
          }
        )
      }
    })
    
  }

 

}
