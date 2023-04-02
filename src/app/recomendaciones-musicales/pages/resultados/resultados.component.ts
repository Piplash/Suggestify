import { Component, OnInit } from '@angular/core';
import { IInfoArtista } from 'src/app/interfaces/info-artista';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit{
  public infoArtista: IInfoArtista;

  constructor(){
    this.infoArtista = {
      id: localStorage.getItem('spId')!,
      nombreCancion: localStorage.getItem('spNombreCancion')!,
      artista: localStorage.getItem('spArtista')!,
      nombreAlbum: localStorage.getItem('spNombreAlbum')!,
      imagen: localStorage.getItem('spImagen')!
    }
  }

  ngOnInit(): void {
    
  }
}
