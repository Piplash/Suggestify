import { Component, OnInit, ViewChild } from '@angular/core';

import { environment } from 'src/environments/dev';

import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-descubre',
  templateUrl: './descubre.component.html',
  styleUrls: ['./descubre.component.css']
})
export class DescubreComponent implements OnInit{

  @ViewChild('cancionBuscada') cancionBuscada!: any;
  
  public respuesta: any;
  public boolean: boolean;

  constructor( private spotifyService: SpotifyService,
               private router: Router ){
    this.boolean = false;
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
        this.respuesta = data.tracks.items[0].album.artists;
        this.boolean = true;
      }
    )
  }

}
