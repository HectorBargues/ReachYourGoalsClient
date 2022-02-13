import { Component, OnInit } from '@angular/core';
import { Iejercicio } from 'src/app/model/ejercicios-interfaces';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.css']
})
export class EjerciciosComponent implements OnInit {
oejercicioapi: Iejercicio[] =null;

  constructor() { }

  ngOnInit(): void {
    fetch("https://exercisedb.p.rapidapi.com/exercises", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "exercisedb.p.rapidapi.com",
		"x-rapidapi-key": "4cf43eeef2msh2ed30f5152b2e5ap1efe5fjsn7a03e031ba96"
	}
})
.then(response => response.json())
    .then(data => {
    console.log(data)
    this.oejercicioapi = data
    })
.catch(err => {
	console.error(err);
});
  }

}
