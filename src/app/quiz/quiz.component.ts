import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../question-service/question-service.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
// quiz data
  quiz = [];
  // number of displayed question
  current = 0;
  result = 0;
  isDone = false;
  form = new FormGroup({
    quiz: new FormArray([])
  });
  constructor(private questionService: QuestionService) { }
// Download quiz data and creating for according to it
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
  // get answer for quistion # i
  answer(i) {
    return (this.form.get('quiz') as FormArray).controls[i].value;
  }
  // counting correct answers, writing result, freezing quiz
  done() {
    let correctAnswers = 0;
    this.quiz.forEach((question, i) => {
      if (question.correctAnswer === this.answer(i)) {
        correctAnswers++;
      }
    });
    this.result = Math.round(correctAnswers * 100 / this.quiz.length);
    this.isDone = true;
  }
}
