import { PostModel } from "../shared/models/post.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';


import {ResponsePageable} from "../shared/models/responsePageable.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../shared/services/post/post.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  @Output() searchResultsChanged = new EventEmitter<{ title: string | undefined; results: PostModel[] | undefined }>();
  @Output() searchCleared = new EventEmitter<void>();
  @ViewChild('aboutModal') aboutModal!: ElementRef;
  isContactModalOpen = false;

  contactForm!: FormGroup;
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
    private postService: PostService,
    private modalService: NgbModal,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
  ) {
    this.contactForm = this.formBuilder.group({
      contactEmail: ['', [Validators.required, Validators.email]],
      contactMessage: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }

  public postLogout() {
    this.postService.logout().subscribe(
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
    this.postService.getPostsByTitle(title).subscribe({
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

  openModal() {
    this.modalService.open(this.aboutModal, { ariaLabelledBy: 'modal-title' });
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
