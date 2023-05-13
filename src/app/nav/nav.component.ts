import {PostModel} from "../shared/models/post.model";
import {BlogService} from "../shared/services/blog.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
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
    this.getPostsByTitleNav();
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
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      },
      (err) => {
        console.error('Erro ao fazer logout', err);
      }
    );
  }

  public getPostsByTitleNav(title?: string, clearTitle: boolean = false) {
    this.service.getPostsByTitle(title).subscribe({
      next: (data: ResponsePageable) => {
        this.listPosts = data.content;
        this.searchResultsChanged.emit({ title: title, results: this.listPosts });
        if (clearTitle) {
          this.title = '';
        }
        this.cdr.detectChanges();
      },
      error: (e: any) => console.error(e),
    });
  }

  public onFormSubmit() {
    this.getPostsByTitleNav(this.title);
    this.title = '';
  }
}
