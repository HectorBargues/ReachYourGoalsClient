import { Component, OnInit } from '@angular/core';
import { Idietas } from 'src/app/model/dietas-interfaces';

@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.component.html',
  styleUrls: ['./dietas.component.css']
})
export class DietasComponent implements OnInit {
  odietasapi: Idietas[] =null;
  constructor() { }

  ngOnInit(): void {
    fetch("https://food-calorie-data-search.p.rapidapi.com/api/search?keyword=apple", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "food-calorie-data-search.p.rapidapi.com",
		"x-rapidapi-key": "4cf43eeef2msh2ed30f5152b2e5ap1efe5fjsn7a03e031ba96"
	}
})
.then(response => response.json())
    .then(data => {
    console.log(data)
    this.odietasapi = data
    })
.catch(err => {
	console.error(err);
});
  }

}
