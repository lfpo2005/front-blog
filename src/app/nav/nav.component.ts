import {PostModel} from "../shared/models/post.model";
import {BlogService} from "../shared/services/blog.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  @Output() searchResultsChanged = new EventEmitter<PostModel[]>();
  @Output() searchCleared = new EventEmitter<void>();

  searchTerm: string = '';
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
        // console.log('Logout realizado com sucesso!', res);
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      },
      (err) => {
        console.error('Erro ao fazer logout', err);
      }
    );
  }


  public searchPosts(searchTerm?: string) {
    if (searchTerm) {
      this.searchTerm = searchTerm;
    }
    this.service.getSearch(this.searchTerm ?? '').subscribe({
      next: (data) => {
        console.log(data);
        this.listPosts = data;
        this.searchResultsChanged.emit(data);
        this.clearInput();
      },
      error: (e) => console.error(e),
    });
  }

  public clearInput() {
    this.searchTerm = '';
    this.searchCleared.emit();
  }
  public clearSearch() {
    this.searchTerm = '';
    this.getAllPosts();
    this.searchResultsChanged.emit(this.listPosts);
  }
}

