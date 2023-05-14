import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-share-buttons',
  templateUrl: './share-buttons.component.html'
})
export class ShareButtonsComponent {
  @Input() title = document.title;
  @Input() url = '';

  constructor(private location: Location) {
    this.url = window.location.origin + this.location.path();
  }

  getFacebookShareUrl() {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url)}&t=${encodeURIComponent(this.title)}`;
    return facebookShareUrl;
  }

  getTwitterShareUrl() {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.title)}&url=${encodeURIComponent(this.url)}`;
    return twitterShareUrl;
  }

  getLinkedInShareUrl() {
    const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(this.url)}&title=${encodeURIComponent(this.title)}`;
    return linkedinShareUrl;
  }

  getInstagramShareUrl() {
    const instagramShareUrl = `https://www.instagram.com/share?url=${encodeURIComponent(this.url)}`;
    return instagramShareUrl;
  }
}
