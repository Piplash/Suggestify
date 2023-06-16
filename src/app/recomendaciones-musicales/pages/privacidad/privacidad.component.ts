import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacidad',
  templateUrl: './privacidad.component.html',
  styleUrls: ['./privacidad.component.css']
})
export class PrivacidadComponent implements OnInit{
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
