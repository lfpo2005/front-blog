import {AnsweredType} from "../enum/answeredType";

export class ContactModel {

  messageContactId?: string;
  message?: string;
  name?: string;
  userAnswer?: string;
  email?: string;
  answered?: AnsweredType;
  visualized?: boolean;
  creationDate?: Date;
  dateAnswer?: Date;
}
