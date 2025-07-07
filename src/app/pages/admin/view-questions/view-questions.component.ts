import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  quizId:number=0;
  quizTitle:any;
  questions:any;

  constructor(private route:ActivatedRoute,private questionsService:QuestionsService) { }

  ngOnInit(): void {
    this.quizId=this.route.snapshot.params["id"];
    this.quizTitle=this.route.snapshot.params["title"];
    this.questionsService.getQuestionsOfQuiz(this.quizId).subscribe(
      (data:any) => this.questions=data,
      (error) => console.log(error)
    )
  }
  deleteQuestion(questionId:number) {
    Swal.fire({
      icon:'warning',
      title:'Are you sure you want to delete this quiz?',
      confirmButtonText:'Delete',
      showCancelButton:true,
      cancelButtonText:'Cancel',
      cancelButtonColor:'red'
    }).then((result)=>{
      if (result.isConfirmed) {
        this.questionsService.deleteQuestion(questionId).subscribe(
          (data:any)=>{
            Swal.fire("Sucess","Quiz is successfully deleted","success");
            this.questions = this.questions.filter((question:any) => question.questionId != questionId )
          },
          (error)=>{
            Swal.fire("Error","Error in loading data","error");
          }
        )
      }
    })
  }

}
