import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
  public tituloNav  : string;
  public inicio     : string;
  public acercaDe   : string;
  public privacidad : string;
  public idioma     : string;

  constructor(){
    this.tituloNav  = "Descubre";
    this.inicio     = "Inicio";
    this.acercaDe   = "Acerca de";
    this.privacidad = "Privacidad";
    this.idioma     = "EN";
  }

  ngOnInit(): void {
    if(!localStorage.getItem("idioma")){
      localStorage.setItem("idioma", this.idioma);
    }

    if(localStorage.getItem("idioma") == "EN"){
      this.tituloNav  = "Discover";
      this.inicio     = "Home";
      this.acercaDe   = "About";
      this.privacidad = "Privacy";
      this.idioma     = "ES";
    }else{
      this.tituloNav  = "Descubre";
      this.inicio     = "Inicio";
      this.acercaDe   = "Acerca de";
      this.privacidad = "Privacidad";
      this.idioma     = "EN";
    }
  }

  public cambiarIdioma(): void{
    if(localStorage.getItem("idioma") == "EN"){
      localStorage.setItem("idioma", "ES");
    }else{
      localStorage.setItem("idioma", "EN");
    }
    location.reload();
  }
}
