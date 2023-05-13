import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-policy-privacy-security',
  templateUrl: './policy-p-s.component.html'
})
export class PolicyPSComponent implements OnInit {
  constructor(private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Política de privacidade e segurança');

  }

}
