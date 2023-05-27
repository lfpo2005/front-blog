import { Component, EventEmitter, Output } from '@angular/core';
import { ContactService } from "../shared/services/contact/contact.service";
import { ContactModel } from "../shared/models/contact.model";
import { AuthService } from "../shared/services/auth.service";
import {AnsweredType} from "../shared/enum/answeredType";
import {Subject} from "rxjs";

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
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getMessages();
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

    const token = this.authService.getToken(); // Obter o token de autenticação

    this.contactService.getMsgContactById(id, token).subscribe(
      (data) => {
        // Atualiza a variável currentMessage com os dados da mensagem
        this.currentMessage = data;
      },
      (error) => console.error(error)
    );
  }
  onAnsweredTypeChange(event: Event): void {
    console.log('onAnsweredTypeChange called');

    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    console.log(`Selected value: ${selectedValue}`);

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

    console.log(`AnsweredType to be sent: ${answeredType}`);

    const token = this.authService.getToken();

    console.log(`Token: ${token}`);

    console.log(`Current message ID: ${this.currentMessage.messageContactId}`);

    if (this.currentMessage && this.currentMessage.messageContactId) {
      const answeredTypeWrapper = { newAnsweredType: answeredType };

      const token = this.authService.getToken();
      if (token === null) {
        console.error('Token is null');
        return;
      }

      this.contactService.updateAnsweredStatus(this.currentMessage.messageContactId, answeredTypeWrapper, token).subscribe(() => {
        console.log('HTTP request successful');
        this.currentMessage.answered = answeredType;
      }, error => {
        console.log('HTTP request failed');
        console.log(error);
        // Handle error.
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
