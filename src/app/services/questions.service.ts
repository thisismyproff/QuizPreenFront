import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { get } from 'http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http:HttpClient) { }

  public getQuestionsOfQuiz (quizId:number) {
    return this.http.get(`${baseUrl}/questions/quiz/all/${quizId}`)
  }
  public getQuestionsOfQuizForTest (quizId:number) {
    return this.http.get(`${baseUrl}/questions/quiz/${quizId}`)
  }

  public addQuestion (question:any) {
    return this.http.post(`${baseUrl}/questions/`,question)
  }
  public result (question:any) {
    return this.http.post(`${baseUrl}/questions/result/`,question)
  }

  public deleteQuestion (quizId:number) {
    return this.http.delete(`${baseUrl}/questions/${quizId}`)
  }

}
