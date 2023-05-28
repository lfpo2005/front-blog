import { Component, EventEmitter, Output } from '@angular/core';
import { ContactService } from "../shared/services/contact/contact.service";
import { ContactModel } from "../shared/models/contact.model";
import { AuthService } from "../shared/services/auth.service";
import {AnsweredType} from "../shared/enum/answeredType";
import {Subject} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-message-contact',
  templateUrl: './message-contact.component.html'
})
export class MessageContactComponent {
  @Output() contactCreated = new EventEmitter<ContactModel>();
  public dataChanged: Subject<void> = new Subject<void>();


  messages: any[] = [];
  currentMessage: any;
  private newAnsweredType: any;
  constructor(
    private contactService: ContactService,
    private authService: AuthService,
    private datePipe: DatePipe,

  ) {}

  ngOnInit() {
    this.getMessages();
  }
  formatData(data: string | null): string {
    const dataFormat = this.datePipe.transform(data, 'dd/MM/yyyy');
    return dataFormat ? dataFormat : '';
  }
  getMessages() {
    const token = this.authService.getToken(); // Obter o token de autenticação

    this.contactService.getAllMsgContacts(token).subscribe(
      (data) => (this.messages = data),
      (error) => console.error(error)
    );
  }

  viewMessage(id: string) {
    if (!id) {
      console.error('ID is undefined');
      return;
    }

    const token = this.authService.getToken();

    this.contactService.getMsgContactById(id, token).subscribe(
      (data) => {
        this.currentMessage = data;
      },
      (error) => console.error(error)
    );
  }
  onAnsweredTypeChange(event: Event): void {

    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    let answeredType: AnsweredType;
    switch (selectedValue) {
      case 'YES':
        answeredType = AnsweredType.YES;
        break;
      case 'NOT':
        answeredType = AnsweredType.NOT;
        break;
      case 'NO_ACTION':
      default:
        answeredType = AnsweredType.NO_ACTION;
        break;
    }

    const token = this.authService.getToken();

    if (this.currentMessage && this.currentMessage.messageContactId) {
      const answeredTypeWrapper = { newAnsweredType: answeredType };

      const token = this.authService.getToken();
      if (token === null) {
        console.error('Token is null');
        return;
      }

      this.contactService.updateAnsweredStatus(this.currentMessage.messageContactId, answeredTypeWrapper, token).subscribe(() => {
        this.currentMessage.answered = answeredType;
      }, error => {
      });
    } else {
      console.error('Current message or message ID is undefined');
    }

  }

  deleteMessage(id: string) {
    const token = this.authService.getToken();

    this.contactService.deleteMsgContact(id, token).subscribe(
      () => this.getMessages(),
      (error) => console.error(error)
    );
  }

  protected readonly HTMLSelectElement = HTMLSelectElement;
}
