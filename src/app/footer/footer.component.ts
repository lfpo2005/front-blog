import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {BlogService} from "../shared/services/blog.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  constructor(private service: BlogService, private toastr: ToastrService) {}

  public newsletterForm: FormGroup = new FormGroup({
    emailTo: new FormControl(''),
    name: new FormControl(''),
    activeNewsletter: new FormControl(''),
  });

  public postNewsletter() {
    this.service.postNewsletter(this.newsletterForm?.value).subscribe(
      (res) => {
        console.log('Newsletter enviada com sucesso!', res);
        // limpar o formulário
        this.newsletterForm.reset();
        // exibir mensagem pop-up de sucesso
        this.toastr.success('Obrigado por se inscrever em nossa newsletter!');
      },
      (err) => {
        console.error('Erro ao enviar newsletter', err);
        // exibir mensagem pop-up de erro
        this.toastr.error('Não foi possível se inscrever em nossa newsletter. Tente novamente mais tarde.');
      }
    );
  }
}
