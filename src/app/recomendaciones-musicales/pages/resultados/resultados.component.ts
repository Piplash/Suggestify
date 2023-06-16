import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

import { IInfoArtista } from 'src/app/interfaces/info-artista';
import { IRecomendaciones } from 'src/app/interfaces/recomendaciones';
import { IUsuario } from 'src/app/interfaces/usuario';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit{
  public infoArtista: IInfoArtista;
  public recomendaciones: Array<IRecomendaciones>;
  public datosRecomendacion: IRecomendaciones;
  public usuario!: IUsuario;
  public playList!: string;

  public idioma: string;

  public tituloBasado       : string;
  public tituloRecomendacion: string;
  public cancion            : string;
  public artista            : string;
  public album              : string;
  public lanzamiento        : string;

  public placeholder        : string;
  public textoBoton         : string;
  public textoBoton2        : string;

  public textoModal: any;


  @ViewChild('nombrePlayList') nombrePlayList!: any;
  @ViewChild('myModal') myModal!: TemplateRef<any>;
  public closeResult!: string;

  constructor( private spotifyService: SpotifyService,
               private modalService: NgbModal,
               private route: Router ){
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

    this.recomendaciones = [];
    this.datosRecomendacion = {
      imagen: '',
      nombreCancion: '',
      nombreArtista: '',
      linkRepro: '',
      uri: ''
    }

    this.idioma = "";

    this.tituloBasado         = "";
    this.tituloRecomendacion  = "";
    this.cancion              = "";
    this.artista              = "";
    this.album                = "";
    this.lanzamiento          = "";
    this.placeholder          = "";
    this.textoBoton           = "";
    this.textoBoton2           = "";

    this.textoModal = {
      titulo: "",
      bajada: ""
    }
    
  }

  ngOnInit(): void {
    this.obtenerRecomendaciones(this.infoArtista.idArtista, this.infoArtista.idCancion);
    this.obtenerUsuario();

    if(localStorage.getItem("idioma")=="EN"){
      this.idioma = "EN"

      this.tituloBasado         = "Based on";
      this.tituloRecomendacion  = "We suggest you";
      this.cancion              = "Song";
      this.artista              = "Artist";
      this.album                = "Album";
      this.lanzamiento          = "Release Date";
      this.placeholder          = "Name your playlist";
      this.textoBoton           = "Create!";
      this.textoBoton2          = "Search Again!";

      this.textoModal = {
        titulo: "Your playlist is ready!",
        bajada: "Find it in your Spotify account :)"
      }

    }else{
      this.idioma = "ES"

      this.tituloBasado         = "Basado en";
      this.tituloRecomendacion  = "Te recomendamos";
      this.cancion              = "Canción";
      this.artista              = "Artista";
      this.album                = "Álbum";
      this.lanzamiento          = "Lanzamiento";
      this.placeholder          = "Dale un nombre a tu playlist";
      this.textoBoton           = "Crear!";
      this.textoBoton2          = "Vuelve a Buscar!";

      this.textoModal = {
        titulo: "Tu playlist está lista!",
        bajada: "Encuéntrala en tu cuenta de Spotify :)"
      }
    }
  }

  public obtenerUsuario(): void{
    this.spotifyService.getUsuario().subscribe(
      (data: any)=>{
        this.usuario = {
          id: data.id,
          nombre: data.display_name
        }
      }
    )
  }

  public obtenerRecomendaciones(idArtista: string, idCancion: string): void{
    this.spotifyService.getRecomendaciones(idArtista, idCancion).subscribe(
      (data: any) => {
        for(let i = 0; i < data.tracks.length; i++){
          
          this.datosRecomendacion = {
            imagen: data.tracks[i].album.images[1].url,
            nombreCancion: data.tracks[i].name,
            nombreArtista: data.tracks[i].artists[0].name,
            linkRepro: data.tracks[i].external_urls.spotify,
            uri: data.tracks[i].uri
          }

          this.recomendaciones.push(this.datosRecomendacion);
        }
      }
    )
  }

  public crearPlayList(): void {
    this.playList = this.nombrePlayList.nativeElement.value;
    this.spotifyService.postPlayList(this.usuario.id, this.playList, this.infoArtista.nombreCancion, this.infoArtista.artista).subscribe(
      (data:any)=>{
        if(data){
          let idPlayList = data.id;
          this.aniadirCanciones(idPlayList);
        }
      }
    )
  }

  public aniadirCanciones(idPlayList: string): void{
    let uris = [];
    for(let uri of this.recomendaciones){
      uris.push(uri.uri);
    }
    this.spotifyService.postRecomendaciones(idPlayList, uris).subscribe(
      (data) =>{
        if(data){
          this.openModal();
          setTimeout(() => {
            this.closeModal();
          }, 5000);
        }
      }
    )
  }

  public volver(): void{
    this.route.navigateByUrl('recomendaciones-musicales/descubre');
  }

  
  public openModal(): void {
    this.modalService.open(this.myModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Cerrado con: ${result}`;
    }, (reason) => {
      this.closeResult = `Descartado con: ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'Presionado Esc';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'Clic en el fondo';
    } else {
      return `Cerrado con: ${reason}`;
    }
  }

  public closeModal(): void {
    this.modalService.dismissAll();
  }
  
}
