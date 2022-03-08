import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pip-authentication-container',
  styleUrls: ['./authentication-container.component.scss'],
  templateUrl: './authentication-container.component.html',
})
export class AuthenticationContainerComponent implements OnInit {
  @Input() headerText: string = '';

  constructor() {}

  ngOnInit() {}
}
