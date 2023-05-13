import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-policy-cookies',
  templateUrl: './policy-cookies.component.html'
})
export class PolicyCookiesComponent implements OnInit {
  constructor(private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Política de Cookies');

  }

}
