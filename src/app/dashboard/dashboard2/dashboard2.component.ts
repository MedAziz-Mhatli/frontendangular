import { Component, OnInit } from '@angular/core';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.sass'],
})
export class Dashboard2Component implements OnInit {
  constructor() {}
  active;
  active2 = 'top';
  active3;
  active4;
  disabled = true;
  acc: any;
  disabledd = false;
  content =
    'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf' +
    'moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.' +
    'Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda' +
    'shoreditch et. Nihil anim keffiyeh helvetica,';

 

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.active3 = 1;
    }
  }

  ngOnInit(): void {}
}
