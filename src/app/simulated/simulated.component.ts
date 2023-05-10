import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../shared/services/blog.service';
import { AnswerSubmission } from '../shared/models/answerSubmission.model';
import { AuthService } from '../shared/services/auth.service';
import { interval, Subscription } from 'rxjs';
import {QuestionModel} from "../shared/models/question.model";
import {Meta, Title} from "@angular/platform-browser";
import { ChangeDetectorRef } from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';


@Component({
  selector: 'app-simulated',
  templateUrl: './simulated.component.html',
})
export class SimulatedComponent implements OnInit, OnDestroy, AfterViewInit {
  questions: QuestionModel[] = [];
  countdown: string = '01:00:00';
  private timerSubscription!: Subscription;
  public secondsRemaining = 3600;
  showClock = true;
  public showResults = false;
  public incorrectQuestions: QuestionModel[] = [];
  public resultMessage = '';
  skippedQuestions: number[] = [];
  quizStarted = false;
  public showAllQuestionsModal = false;

  constructor(private service: BlogService,
              private authService: AuthService,
              private titleService: Title,
              private metaService: Meta,
              private cdr: ChangeDetectorRef,
              private renderer: Renderer2,
              private el: ElementRef
  ) {this.metaService.addTag({
    name: 'description',
    content: 'Pratique suas habilidades para a prova PSM com nosso simulado online. O simulado inclui questões cuidadosamente elaboradas para avaliar sua compreensão das práticas e princípios do Scrum. Teste-se agora e esteja preparado para o exame oficial do PSM!'
  }); }

  ngOnInit(): void {
    this.getNewQuestions([]);
    this.service.startQuiz().subscribe((questions) => {
      this.questions = questions;
    });
    this.titleService.setTitle('Blog Agil - Simulado Scrum');
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
  openAllQuestionsModal(event: MouseEvent) {
    event.stopPropagation();
    this.showAllQuestionsModal = true;
  }
  ngAfterViewInit() {
    const allQuestionsLink = this.el.nativeElement.querySelector('#allQuestionsLink');
    this.renderer.listen(allQuestionsLink, 'click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.openAllQuestionsModal(event); // Adicione o argumento event
    });
  }

  startTimer(): void {
    this.stopTimer();
    this.timerSubscription = interval(1000).subscribe(() => {
      this.secondsRemaining -= 1;
      this.updateCountdown();
      if (this.secondsRemaining <= 0) {
        this.stopTimer();
      }
    });
  }
  calculateProgress(): number {
    return (this.secondsRemaining / 3600) * 100;
  }
  private stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private updateCountdown(): void {
    const hours = Math.floor(this.secondsRemaining / 3600);
    const minutes = Math.floor((this.secondsRemaining % 3600) / 60);
    const seconds = this.secondsRemaining % 60;

    this.countdown = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(number: number): string {
    return number.toString().padStart(2, '0');
  }

  submitQuiz() {
    const unanswered = this.unansweredQuestions();
    if (unanswered.length > 0) {
      const shouldContinue = confirm(
        `Existem perguntas não respondidas: ${unanswered.join(
          ", "
        )}. Deseja finalizar o simulado mesmo assim?`
      );
      if (!shouldContinue) {
        return;
      }
    }
    const answerSubmissions: AnswerSubmission[] = this.questions.map((question) => {
      return {
        questionId: question.questionId,
        answer: question.selectedAnswer!,
      };
    });
    this.service.submitQuiz(answerSubmissions).subscribe((incorrectQuestions) => {
      const correctQuestionsCount = this.questions.length - incorrectQuestions.length;
      const percentage = (correctQuestionsCount / this.questions.length) * 100;

      incorrectQuestions.forEach((incorrectQuestion) => {
        incorrectQuestion.incorrect = true;
      });

      this.displayResults(percentage, incorrectQuestions);
    });
  }
  answerQuestion(index: number) {
    const skippedIndex = this.skippedQuestions.indexOf(index);
    if (skippedIndex > -1) {
      this.skippedQuestions.splice(skippedIndex, 1);
      this.questions[index].skipped = false;
    }
  }

  unansweredQuestions(): number[] {
    return this.questions
      .map((question, index) =>
        question.selectedAnswer === undefined || question.skipped ? index + 1 : -1
      )
      .filter(index => index !== -1);
  }
  startQuiz(): void {
    this.startTimer();
    this.quizStarted = true;
    setTimeout(() => {
      const countdownText = document.querySelector('.countdown-text');
      if (countdownText) {
        countdownText.classList.add('fixed-countdown');
      }
    }, 0);
  }

  displayResults(percentage: number, incorrectQuestions: QuestionModel[]): void {
    this.showResults = true;
    this.quizStarted = false;
    this.stopTimer();

    this.incorrectQuestions = incorrectQuestions;

    if (percentage >= 80) {
      this.resultMessage = 'Parabéns!';
    } else {
      this.resultMessage = 'Não desista e continue estudando!';
    }
    this.resultMessage += ` Você acertou ${percentage}% das questões.`;
  }

  getNewQuestions(incorrectQuestionIds: string[]): void {
    this.service.startQuiz(incorrectQuestionIds).subscribe((questions) => {
      this.questions = questions;
    });
  }

  skipQuestion(index: number) {
    if (!this.skippedQuestions.includes(index)) {
      this.skippedQuestions.push(index);
      this.questions[index].skipped = true;
      this.cdr.detectChanges();
    }
  }
  goToQuestion(index: number): void {
    const questionElement = document.getElementById(`question-${index}`);
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  onSubmitClick(): void {
    this.submitQuiz();
  }

  protected readonly alert = alert;
}
