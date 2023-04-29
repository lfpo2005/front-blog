import { Component } from '@angular/core';
import {PostModel} from "../shared/models/post.model";

@Component({
  selector: 'app-painel-admin',
  templateUrl: './panel-admin.component.html'
})
export class PanelAdminComponent {
  public formOpen: 'post' | 'dictionary' | 'quiz' | 'dashboard' | null = 'post';
  private token: string = '';

  public openForm(form: 'post' | 'dictionary' | 'quiz' | 'dashboard') {
    this.formOpen = form;
  }

  public closeForm() {
    this.formOpen = null;
  }
  onPostCreated(newPost: PostModel) {
    // Implemente a lógica a ser executada após a criação de uma nova postagem
    console.log(newPost);
  }
}
