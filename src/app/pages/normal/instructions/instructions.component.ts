import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import  Swal from 'sweetalert2'

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
startQuiz() {
  Swal.fire({
    title:"Do you want to start quiz?",
    showCancelButton:true,
    confirmButtonText:'Start',
    icon:"question"
  }).then((result) => {
    if (result.isConfirmed) {
      this.router.navigateByUrl('/start/'+this.quizId)
    }
  }
)
}
  quizId:number=0;
  quiz:any;

  constructor(private route:ActivatedRoute,private quizService:QuizService,private router : Router) { }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['quizId'];
    this.quiz = this.quizService.getQuizById(this.quizId).subscribe(
      (data:any) => {
        this.quiz=data
      },
      (error) => {
        Swal.fire("Error","Something went wrong please login again","error")
      }
    )
  }
  get marksPerQuestion(): number {
    return Math.floor(this.quiz.maxMarks / this.quiz.numberOfQuestions);
  }

}
