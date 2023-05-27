import {Component, OnInit} from '@angular/core';
import {BaseService} from "../shared/services/base.service";
import {FormBuilder, FormGroup } from "@angular/forms";
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {

  constructor(
    private service: BaseService,
    private formBuilder: FormBuilder,
    ) {}
  ngOnInit() {
  }

  public newsletterForm: FormGroup = this.formBuilder.group({
    emailTo: [''],
    name: [''],
    activeNewsletter: [''],
  });

  public postNewsletter() {
    this.service.postNewsletter(this.newsletterForm?.value).subscribe(
      (res) => {
        this.newsletterForm.reset();
        alert('Obrigado por se inscrever em nossa newsletter!');
      },
      (err) => {

        alert('Não foi possível se inscrever em nossa newsletter. Tente novamente mais tarde.');
      }
    );
  }
}
