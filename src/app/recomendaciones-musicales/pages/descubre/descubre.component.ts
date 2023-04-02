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
      id: '',
      nombreCancion: '',
      artista: '',
      nombreAlbum: '',
      imagen: ''
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
          id: data.tracks.items[0].id,
          nombreCancion: data.tracks.items[0].name,
          artista: data.tracks.items[0].artists[0].name,
          nombreAlbum: data.tracks.items[0].album.name,
          imagen: data.tracks.items[0].album.images[2].url
        }
        
        const promesas = [
          console.log("SET 1"),
          localStorage.setItem('spId', this.respuesta.id),
          console.log("SET 2"),
          localStorage.setItem('spNombreCancion', this.respuesta.nombreCancion),
          console.log("SET 3"),
          localStorage.setItem('spArtista', this.respuesta.artista),
          console.log("SET 4"),
          localStorage.setItem('spNombreAlbum', this.respuesta.nombreAlbum),
          console.log("SET 5"),
          localStorage.setItem('spImagen', this.respuesta.imagen)
        ]
    
        Promise.all(promesas).then(() => {
          console.log("NAVEGANDO")
          this.route.navigateByUrl('recomendaciones-musicales/resultados');
        });
      }
    );

    
    
  
  }

}
