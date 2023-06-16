import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit{
  public idioma: string;

  constructor(){
    this.idioma = "";
  }

  ngOnInit(): void {
    if(localStorage.getItem("idioma")){
      this.idioma = localStorage.getItem("idioma")!
    } else {
      this.idioma = "ES";
    }
  }
}
