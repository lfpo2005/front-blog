import {Component, OnInit} from '@angular/core';
import {PostModel} from "./shared/models/post.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  listPosts: PostModel[] | null = null;

  constructor() { }

  ngOnInit(): void {
  }
  onSearchResultsChanged(searchResults: PostModel[]) {
    this.listPosts = searchResults;
  }

}
