import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Input() title: string = "wildCart";  
  @Input() subtitle: string = "wildCart";  
  @Input() filter: string = "";
  @Input() icon: string = "";
  @Input() iconEntity: string = "";
  
  constructor() { }

  ngOnInit() {
  }

}
