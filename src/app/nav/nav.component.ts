import {PostModel} from "../shared/models/post.model";
import {BlogService} from "../shared/services/blog.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ResponsePageable} from "../shared/models/responsePageable.model";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  @Output() searchResultsChanged = new EventEmitter<{ title: string | undefined; results: PostModel[] | undefined }>();
  @Output() searchCleared = new EventEmitter<void>();

  isCollapsed = true;
  title: string = '';
  listPosts?: PostModel[];
  @ViewChild('navbar') navbar!: ElementRef;

  toggleNavbar() {
    this.navbar.nativeElement.classList.toggle('show');
    if(this.navbar.nativeElement.classList.contains('show')) {
      this.navbar.nativeElement.setAttribute('aria-expanded', 'true');
    } else {
      this.navbar.nativeElement.setAttribute('aria-expanded', 'false');
    }
  }
  ngOnInit(): void {
    this.getPosts();
  }
  constructor(
    private service: BlogService,
    private modalService: NgbModal,
    private router: Router,
    private cdr: ChangeDetectorRef,

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
  public getPosts(title?: string, clearTitle: boolean = false) {
    console.log('getPosts function called with title:', title);

    this.service.getPosts(title).subscribe({
      next: (data: ResponsePageable) => {
        this.listPosts = data.content;
        this.searchResultsChanged.emit({ title: title, results: this.listPosts });
        console.log('Value of this.title:', this.title);
        if (clearTitle) {
          this.title = '';
        }
      },
      error: (e: any) => console.error(e),
    });
  }

}
