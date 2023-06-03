import { Component, OnInit } from '@angular/core';
import { PostModel } from "../shared/models/post.model";
import { DictionaryModel } from "../shared/models/dictionary.model";
import { Title } from "@angular/platform-browser";
import {ContactModel} from "../shared/models/contact.model";

@Component({
  selector: 'app-painel-admin',
  templateUrl: './panel-admin.component.html'
})
export class PanelAdminComponent implements OnInit {

  constructor(private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Agile Domain - Cadastro de usuário');
  }
  public formOpen: 'post' | 'dictionary' | 'contact' | 'dashboard' | null = 'post';

  private token: string = '';

  public openForm(form: 'post' | 'dictionary' | 'contact' | 'dashboard') {
    this.formOpen = form;
  }
  public closeForm() {
    this.formOpen = null;
  }
  onPostEditorCreated(newPost: PostModel) {
  }
  onDictionaryCreated(newDictionary: DictionaryModel) {
  }
  onContactCreated(newDictionary: ContactModel) {
  }
}
