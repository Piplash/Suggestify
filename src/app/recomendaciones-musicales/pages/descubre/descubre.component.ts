import { Component, OnInit, ViewChild } from '@angular/core';

import { environment } from 'src/environments/dev';

import { SpotifyService } from '../../services/spotify.service';

import { IInfoArtista } from 'src/app/interfaces/info-artista';
import { Router } from '@angular/router';

@Component({
  selector: 'app-descubre',
  templateUrl: './descubre.component.html',
  styleUrls: ['./descubre.component.css']
})
export class DescubreComponent implements OnInit{

  @ViewChild('cancionBuscada') cancionBuscada!: any;
  @ViewChild('labelError') labelError!: any;
  
  public respuesta  : IInfoArtista;
  public boolean    : boolean;
  public placeholder: string;
  public textoBoton : string;
  public labelErrorUps: string;

  public letraPresionada: any;

  public busquedaNoValida: boolean;

  constructor( private spotifyService: SpotifyService,
               private route: Router ){
    this.boolean = false;
    this.busquedaNoValida = false;
    this.respuesta = {
      idCancion: '',
      idArtista: '',
      idAlbum: '',
      nombreCancion: '',
      artista: '',
      nombreAlbum: '',
      imagen: '',
      lanzamiento: '',
      generos: ''
    }

    this.placeholder  = "";
    this.textoBoton   = "";
    this.labelErrorUps = "";

    localStorage.setItem('spId', '')
    localStorage.setItem('spNombreCancion', '')
    localStorage.setItem('spArtista', '')
    localStorage.setItem('spNombreAlbum', '')
    localStorage.setItem('spImagen', '')
  }

  ngOnInit(): void {
    //Obtiene url actual
    let url = window.location.href

    //Si la url es distinta a X, obtiene y almacena el access_token
    if(url != environment.redirect_uri){
      let token = new URL(url).hash.split('&').filter(
        function( param ) { 
          if( param.match('access_token') !== null ) { 
            return true 
          } else { 
            return false;
          }; 
        })[0].split('=')[1];
      localStorage.setItem('at', token);
      window.location.href = environment.redirect_uri;
    }

    if(localStorage.getItem("idioma") == "EN"){
      this.placeholder  = "Enter a song";
      this.textoBoton   = "Discover!";
      this.labelErrorUps = "Ups. No matches, try again!"
    }else{
      this.placeholder  = "Escribe una canción";
      this.textoBoton   = "¡Descubre!";
      this.labelErrorUps = "Ups. No hay resultados, intenta de nuevo!"
    }
  }


  public buscarCancion(): void{
    let cancion = this.cancionBuscada.nativeElement.value;
    if(/^\s/.test(cancion)){
      cancion = cancion.replace(/^\s/, '');
    }

    if(cancion != ''){
      let cancionEscapada = cancion.replace(/[&<>"'|*`=\/]/g, '');
      this.spotifyService.getTrack(cancionEscapada).subscribe(
        (data: any) =>{
          if(data.tracks.items.length > 0){
            this.busquedaNoValida == false;
            this.respuesta = {
              idCancion: data.tracks.items[0].id,
              idArtista: data.tracks.items[0].artists[0].id,
              idAlbum: data.tracks.items[0].album.id,
              nombreCancion: data.tracks.items[0].name,
              artista: data.tracks.items[0].artists[0].name,
              nombreAlbum: data.tracks.items[0].album.name,
              imagen: data.tracks.items[0].album.images[1].url,
              lanzamiento: data.tracks.items[0].album.release_date
            }
            
            const promesas = [
              localStorage.setItem('spIdCancion', this.respuesta.idCancion),
              localStorage.setItem('spIdArtista', this.respuesta.idArtista),
              localStorage.setItem('spIdAlbum', this.respuesta.idAlbum!),
              localStorage.setItem('spNombreCancion', this.respuesta.nombreCancion),
              localStorage.setItem('spArtista', this.respuesta.artista),
              localStorage.setItem('spNombreAlbum', this.respuesta.nombreAlbum),
              localStorage.setItem('spImagen', this.respuesta.imagen),
              localStorage.setItem('spLanzamiento', this.respuesta.lanzamiento)
            ]
        
            Promise.all(promesas).then(() => {
              this.route.navigateByUrl('recomendaciones-musicales/resultados');
              //this.obtenerGeneros(this.respuesta.idAlbum!);
            });
          }else{
            this.labelError.nativeElement.hidden = false;
          }
        }
      );
    }else{
      this.labelError.nativeElement.hidden = false;
    }
    
  }

  public enterPresionado(event: any){
    if(event.key == "Enter"){
      this.buscarCancion();
    }
  }
}
