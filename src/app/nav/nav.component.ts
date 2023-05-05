import {PostModel} from "../shared/models/post.model";
import {BlogService} from "../shared/services/blog.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {ResponsePageable} from "../shared/models/responsePageable.model";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  @Output() searchResultsChanged = new EventEmitter<{ title: string | undefined; results: PostModel[] | undefined }>();
  @Output() searchCleared = new EventEmitter<void>();

  title: string = '';
  listPosts?: PostModel[];

  ngOnInit(): void {
    this.getPosts();
  }
  constructor(
    private service: BlogService,
    private modalService: NgbModal,
    private router: Router,
  ) {}
  public postLogout() {
    this.service.logout().subscribe(
      (res) => {
        // console.log('Logout realizado com sucesso!', res);
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      },
      (err) => {
        console.error('Erro ao fazer logout', err);
      }
    );
  }
  public getPosts(title?: string) {
    this.service.getPosts(title).subscribe({
      next: (data: ResponsePageable) => {
        this.listPosts = data.content;
        this.searchResultsChanged.emit({ title: title, results: this.listPosts });
      },
      error: (e: any) => console.error(e),
    });
  }

  public clearSearch() {
    this.title = '';
    this.getPosts();
  }
  public navigateToSimulated() {
    this.router.navigate(['/simulado']);
  }

}
