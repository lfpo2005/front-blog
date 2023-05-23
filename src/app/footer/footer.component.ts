import { Component } from '@angular/core';
import {BlogService} from "../shared/services/blog.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  constructor(private service: BlogService) {}

  public newsletterForm: FormGroup = new FormGroup({
    emailTo: new FormControl(''),
    name: new FormControl(''),
    activeNewsletter: new FormControl(''),
  });

  public postNewsletter() {
    this.service.postNewsletter(this.newsletterForm?.value).subscribe(
      (res) => {
        // limpar o formulário
        this.newsletterForm.reset();
        // exibir mensagem pop-up de sucesso
        alert('Obrigado por se inscrever em nossa newsletter!');
      },
      (err) => {
       // console.error('Erro ao enviar newsletter', err);
        // exibir mensagem pop-up de erro
        alert('Não foi possível se inscrever em nossa newsletter. Tente novamente mais tarde.');
      }
    );
  }
}
