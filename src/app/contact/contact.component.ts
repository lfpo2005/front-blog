import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../shared/services/contact/contact.service';
import { ContactModel } from '../shared/models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {
    this.contactForm = this.formBuilder.group({
      contactEmail: ['', [Validators.required, Validators.email]],
      contactMessage: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }

  ngOnInit(): void {
  }

  postContactForm() {
    if (this.contactForm.valid) {
      const contactModel: ContactModel = {
        email: this.contactForm.value['contactEmail'],
        message: this.contactForm.value['contactMessage']
      };
      this.contactService.createContact(contactModel).subscribe(
        response => {
          this.contactForm.reset();
          this.contactForm.markAsUntouched();
          this.router.navigate(['/contato'], { queryParams: { event: 'mensagemenviada' } });

          alert('Agradecemos pelo contato!');
        },
        error => {
          console.error('Erro ao enviar o formulário de contato', error);
        }
      );
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
