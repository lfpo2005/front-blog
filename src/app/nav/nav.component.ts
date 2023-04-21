import {Component, OnInit} from '@angular/core';
import {PostModel} from "../shared/models/post.model";
import {BlogService} from "../shared/services/blog.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

  listPosts?: PostModel[];

  ngOnInit(): void {
    this.getAllPosts();
  }

  constructor(private service: BlogService, private modalService: NgbModal) {
  }

  public getAllPosts() {
    this.service.getAllPosts().subscribe({
      next: (data) => {
        this.listPosts = data.content;
      },
      error: (e) => console.error(e),
    });
  }
}
