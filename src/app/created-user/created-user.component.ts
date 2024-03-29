import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { BaseService } from "../shared/services/base.service";
import { UserModel } from "../shared/models/user.model";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-created-user',
  templateUrl: './created-user.component.html'
})
export class CreatedUserComponent implements OnInit {
  userForm: FormGroup;
  formSubmitted: boolean = false;
  error: string = '';
  alertMessage: string | null = null;

  ngOnInit(): void {
    this.titleService.setTitle('Metodologia-Agil - Cadastro de usuário');
  }

  showAlert(message: string) {
    this.alertMessage = message;
    setTimeout(() => {
      this.alertMessage = null;
    }, 5000);
  }

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private blogService: BaseService,
    private router: Router,
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    }, {validator: this.checkPasswords});
  }

  validationMessages = {
    'username': {
      'required': 'O campo username é obrigatório.'
    },
    'email': {
      'required': 'O campo email é obrigatório.'
    },
    'password': {
      'required': 'O campo password é obrigatório.',
      'minlength': 'A senha deve ter pelo menos 6 caracteres.'
    },

    'confirmPassword': {
      'required': 'O campo confirmar senha é obrigatório.',
      'notSame': 'As senhas não são iguais'
    },
    'fullName': {
      'required': 'O campo nome completo é obrigatório.'
    },
    'phoneNumber': {
      'required': 'O campo telefone é obrigatório.'
    }
  };

  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;

    return confirmPass && pass === confirmPass ? null : {notSame: true};
  }
  onSubmit() {
    if (this.userForm.valid) {
      const user: UserModel = this.userForm.value;
      this.router.navigate(['/login'], { queryParams: { event: 'confirmacadastro' } });
      this.blogService.createdUser(user).subscribe(
        (userCreated) => {
          this.userForm.reset();
          alert('User criado com sucesso!');
          this.router.navigate(['/login']);
        },
        (err) => {
          alert('Erro ao criar user!');
        }
      );
    } else {
      alert('Erro ao criar user!');
    }
  }
  passwordVisible = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

}
