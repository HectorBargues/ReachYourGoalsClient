import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/service/icon.service';
declare let $: any;
// import * as $ from 'jquery';
@Component({
  selector: 'app-adminbar',
  templateUrl: './adminbar.component.html',
  styleUrls: ['./adminbar.component.css']
})
export class AdminbarComponent implements OnInit {

  constructor(
    
    public oIconService: IconService
    
  ) { }

  ngOnInit(): void {
    //  $(".hamburger").click(function(){
    //   $(".wrapper").toggleClass("collapse");
    // });
  }

}
