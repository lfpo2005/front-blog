import {Component, OnInit} from '@angular/core';
import {PostModel} from "../shared/models/post.model";
import {BlogService} from "../shared/services/blog.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

  listPosts?: PostModel[];

  ngOnInit(): void {
    this.getAllPosts();
  }

  constructor(
    private service: BlogService,
    private modalService: NgbModal,
    private router: Router,

  ) {}

  public getAllPosts() {
    this.service.getAllPosts().subscribe({
      next: (data) => {
        this.listPosts = data.content;
      },
      error: (e) => console.error(e),
    });
  }

  public postLogout() {
    this.service.logout().subscribe(
      (res) => {
        console.log('Logout realizado com sucesso!', res);
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      },
      (err) => {
        console.error('Erro ao fazer logout', err);
      }
    );
  }
}
