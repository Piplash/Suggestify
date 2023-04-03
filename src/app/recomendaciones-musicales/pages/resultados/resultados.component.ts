import { Component, OnInit } from '@angular/core';
import { IInfoArtista } from 'src/app/interfaces/info-artista';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit{
  public infoArtista: IInfoArtista;

  constructor( private spotifyService: SpotifyService ){
    this.infoArtista = {
      idCancion: localStorage.getItem('spIdCancion')!,
      idArtista: localStorage.getItem('spIdArtista')!,
      idAlbum: localStorage.getItem('spIdAlbum')!,
      nombreCancion: localStorage.getItem('spNombreCancion')!,
      artista: localStorage.getItem('spArtista')!,
      nombreAlbum: localStorage.getItem('spNombreAlbum')!,
      imagen: localStorage.getItem('spImagen')!,
      lanzamiento: localStorage.getItem('spLanzamiento')!
    }
  }

  ngOnInit(): void {
    this.obtenerRecomendaciones(this.infoArtista.idArtista, this.infoArtista.idCancion);
  }

  public obtenerRecomendaciones(idArtista: string, idCancion: string){
    this.spotifyService.getRecomendaciones(idArtista, idCancion).subscribe(
      (data: any) => {
        console.log(data)
      }
    )
  }
}
