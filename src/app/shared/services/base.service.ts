import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponsePageable } from "../models/responsePageable.model";
import { EmailModel } from "../models/email.model";
import { UserModel } from "../models/user.model";
import { LoginResponse } from "../interfaces/login.response"
import {PostModel} from "../models/post.model";
import {DictionaryModel} from "../models/dictionary.model";
import {QuestionModel} from "../models/question.model";
import {AnswerSubmission} from "../models/answerSubmission.model";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  isAuthenticated() {

  }

  apiUrl = 'http://localhost:8087/blog';
  //apiUrl = 'https://metodologia-agil.com.br/blog';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(
    protected httpClient: HttpClient

  ) {}

 protected getHttpOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  protected getAuthenticatedHttpOptions(token: string): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
  }


  public submitQuiz(answerSubmissions: AnswerSubmission[]): Observable<QuestionModel[]> {
    return this.httpClient.post<QuestionModel[]>(`${this.apiUrl}/quiz/submit`, answerSubmissions);
  }
  public startQuiz(incorrectQuestionIds?: string[]): Observable<QuestionModel[]> {
    let params = new HttpParams();
    if (incorrectQuestionIds) {
      params = params.set('incorrectQuestionIds', incorrectQuestionIds.join(','));
    }
    return this.httpClient.get<QuestionModel[]>(`${this.apiUrl}/quiz/start`, { params });
  }

  public getDictionaryWord(word: string): Observable<ResponsePageable> {
    return this.httpClient.get<ResponsePageable>(`${this.apiUrl}/dictionaries?word=${word}`)
  }

  public createDictionary(dictionaryModel: DictionaryModel): Observable<DictionaryModel> {
    return this.httpClient.post<DictionaryModel>(`${ this.apiUrl }/dictionaries`, dictionaryModel, this.httpOptions);
  }
  public createdUser(userModel: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${ this.apiUrl }/auth/signup`, userModel, this.httpOptions);
  }

  public postNewsletter(emailModel: EmailModel): Observable<EmailModel> {
    return this.httpClient.post<EmailModel>(`${ this.apiUrl }/newsletter`, emailModel, this.httpOptions);
  }

  public login(userModel: UserModel): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/auth/login`, userModel, this.httpOptions);
  }
  public logout(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/auth/logout`);
  }

}

