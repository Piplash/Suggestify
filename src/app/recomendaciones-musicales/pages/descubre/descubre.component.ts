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
  
  public respuesta: IInfoArtista;
  public boolean: boolean;

  constructor( private spotifyService: SpotifyService,
               private route: Router ){
    this.boolean = false;
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
      console.log(localStorage.getItem('at'))
      window.location.href = environment.redirect_uri;
    }

  }

  public buscarCancion(): void{
    let cancion = this.cancionBuscada.nativeElement.value;
    this.spotifyService.getTrack(cancion).subscribe(
      (data: any) =>{
        console.log(data);


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
          console.log("NAVEGANDO")
          this.route.navigateByUrl('recomendaciones-musicales/resultados');
          //this.obtenerGeneros(this.respuesta.idAlbum!);
        });
      }
    );
  }

  /*public obtenerGeneros(idAlbum: string){
    this.spotifyService.getGeneros(idAlbum).subscribe(
      (data: any) => {
        let generos = data.genres;
        console.log(generos)
      }
    )
  }*/
}
