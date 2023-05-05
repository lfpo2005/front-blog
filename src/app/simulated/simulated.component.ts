import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionModel } from '../shared/models/question.model';
import { BlogService } from '../shared/services/blog.service';
import { AnswerSubmission } from '../shared/models/answerSubmission.model';
import { AuthService } from '../shared/services/auth.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-simulated',
  templateUrl: './simulated.component.html',
})
export class SimulatedComponent implements OnInit, OnDestroy {
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
  constructor(private service: BlogService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getNewQuestions([]);
    this.service.startQuiz().subscribe((questions) => {
      this.questions = questions;
    });
  }

  ngOnDestroy(): void {
    this.stopTimer();
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
    const hasSkippedQuestions = this.questions.some(question => question.skipped);
    if (hasSkippedQuestions) {
      alert('Existem perguntas não respondidas. Por favor, responda todas as perguntas antes de enviar o simulado.');
      return;
    }

    const answerSubmissions: AnswerSubmission[] = this.questions.map((question) => {
      return {
        questionId: question.questionId,
        selectedAnswer: question.selectedAnswer!,
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

  restartQuiz(): void {
    this.showResults = false;
    const incorrectQuestionIds = this.incorrectQuestions.map((q) => q.questionId);
    this.getNewQuestions(incorrectQuestionIds.filter((id) => id !== undefined).map((id) => id!));
  }
  skipQuestion(index: number) {
    this.skippedQuestions.push(index);
    this.questions[index].skipped = true;
  }
  goToQuestion(index: number): void {
    const questionElement = document.getElementById(`question-${index}`);
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
