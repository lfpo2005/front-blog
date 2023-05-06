import { Component, OnInit } from '@angular/core';
import { PostModel } from "../shared/models/post.model";
import { DictionaryModel } from "../shared/models/dictionary.model";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-painel-admin',
  templateUrl: './panel-admin.component.html'
})
export class PanelAdminComponent implements OnInit {

  constructor(private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Blog Agil - Cadastro de usuário');
  }
  public formOpen: 'post' | 'dictionary' | 'quiz' | 'dashboard' | null = 'post';

  private token: string = '';

  public openForm(form: 'post' | 'dictionary' | 'quiz' | 'dashboard') {
    this.formOpen = form;
  }
  public closeForm() {
    this.formOpen = null;
  }
  onPostCreated(newPost: PostModel) {
    //console.log(newPost);
  }

  onDictionaryCreated(newDictionary: DictionaryModel) {
    //console.log(newDictionary);
  }
}
