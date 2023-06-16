import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/dev';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit{

  public url = {
    token: environment.AUTH +
    '?client_id=' + environment.client_id + 
    '&response_type=token' +
    '&redirect_uri=' + encodeURIComponent(environment.redirect_uri) +
    '&scope=playlist-modify-public%20playlist-modify-private' +
    '&expires_in=3600'
  }

  public textoBoton: string;

  constructor ( ) {
    this.textoBoton = "";
  }

  ngOnInit(): void {
    
    if(localStorage.getItem("idioma")=="EN"){
      this.textoBoton = "Discover New Music!";
    }else{
      this.textoBoton = "¡Descubre Nueva Música!";
    }
  }

  public spotifyAuth(): void {
    window.location.href = this.url.token;
  }
}
