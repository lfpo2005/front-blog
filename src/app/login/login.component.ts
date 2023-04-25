import { Component } from '@angular/core';
import { BlogService } from '../shared/services/blog.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {RoleType} from "../shared/models/enum/roleType.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(
    private service: BlogService,
    private toastr: ToastrService,
    private router: Router // injetando o serviço Router
  ) {}

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  public postLogin() {
    this.service.login(this.loginForm?.value).subscribe(
      (res) => {
        console.log('Login realizado com sucesso!', res);
        // limpar o formulário
        this.loginForm.reset();

        // verificar o tipo de usuário e redirecioná-lo
        if (res.roles?.some(role => role === RoleType.ROLE_ADMIN)) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      (err) => {
        console.error('Erro ao fazer o login', err);
        this.toastr.error(
          'Não foi possível fazer o login. Por favor, tente novamente mais tarde.'
        );
      }
    );
  }
}
