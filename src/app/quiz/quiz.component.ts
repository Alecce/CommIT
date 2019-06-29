import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../question-service/question-service.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quiz = [];
  current = 0;
  result = 0;
  isDone = false;
  form = new FormGroup({
    quiz: new FormArray([])
  });
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getQuiz().subscribe(data => {
      this.quiz = (data as any[]);
      this.quiz.forEach(() => {
        (this.form.get('quiz') as FormArray).push(new FormControl('', []));
      });
    }, e => {
      console.error(e);
    });
  }
  prev() {
    this.current--;
  }
  next() {
    this.current++;
  }
  answer(i) {
    return (this.form.get('quiz') as FormArray).controls[i].value;
  }
  done() {
    let correctAnswers = 0;
    this.quiz.forEach((question, i) => {
      console.log(question.correctAnswer);
      console.log(this.answer(i));
      if (question.correctAnswer === this.answer(i)) {
        correctAnswers++;
      }
    });
    this.result = Math.round(correctAnswers * 100 / this.quiz.length);
    this.isDone = true;
  }
}
