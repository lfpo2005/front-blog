import {AnsweredType} from "../enum/answeredType";

export class ContactModel {

  messageContactId?: string;
  message?: string;
  email?: string;
  answered?: AnsweredType;
  visualized?: boolean;
  creationDate?: Date;
}
