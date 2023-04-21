import { Component } from '@angular/core';
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-carrossel',
  templateUrl: './carrossel.component.html',
  providers: [NgbCarouselConfig],
})
export class CarrosselComponent {
  images = [1, 2, 3, 4].map((n) => `https://picsum.photos/id/${n}/1500/300`);

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
}
