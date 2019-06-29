import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) { }
  // Get data from file and return Observable
  getQuiz() {
    return this.http.get('./assets/quiz.json');
  }
}
