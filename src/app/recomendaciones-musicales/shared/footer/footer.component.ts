import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  public desarrolladoPor: string;
  public menu: any;

  constructor() {
    this.desarrolladoPor = "";
  }

  ngOnInit(): void {
    if(localStorage.getItem("idioma") == "EN"){
      this.desarrolladoPor = "This site was developed by "
      this.menu = {
        inicio: "Home",
        acercaDe: "About",
        privacidad: "Privacy"
      }
    }else{
      this.desarrolladoPor = "Este sitio fue desarrollado por "
      this.menu = {
        inicio: "Inicio",
        acercaDe: "Acerca de",
        privacidad: "Privacidad"
      }
    }
  }
}
