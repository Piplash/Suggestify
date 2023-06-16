import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  public spotifyEndpoint = 'https://api.spotify.com/v1/'

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('at')
    })
  };

  constructor( private http: HttpClient ) { }

  public getUsuario(): any{
    return this.http.get(this.spotifyEndpoint+`me`, this.httpOptions);
  }

  public getTrack(cancion: string): any{
    return this.http.get(this.spotifyEndpoint+`search?type=track&q=${cancion}`, this.httpOptions);
  }

  public getGeneros(idAlbum: string): any{
    return this.http.get(this.spotifyEndpoint+`albums/${idAlbum}`, this.httpOptions);
  }

  public getRecomendaciones(idArtista: string, idCancion: string): any{
    return this.http.get(this.spotifyEndpoint+`recommendations?seed_artists=${idArtista}&seed_tracks=${idCancion}&limit=5`, this.httpOptions);
  }

  public postPlayList(idUsuario: string, nombrePlayList: string, nombreCancion: string, nombreArtista: string): any{
    let body = {
      name: nombrePlayList,
      description: "5 recomendaciones basadas en "+nombreCancion+" de "+nombreArtista,
      public: true
    }

    return this.http.post(this.spotifyEndpoint+`users/${idUsuario}/playlists`, body, this.httpOptions);
  }

  public postRecomendaciones(idPlayList: string, URIS: Array<string>){
    let body = {
      "uris": [URIS[0],URIS[1],URIS[2],URIS[3],URIS[4]]
    }
    return this.http.post(this.spotifyEndpoint+`playlists/${idPlayList}/tracks`, body, this.httpOptions);
  }
}
