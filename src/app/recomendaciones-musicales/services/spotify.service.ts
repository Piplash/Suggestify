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

  public getTrack(cancion: string): any{
    return this.http.get(this.spotifyEndpoint+`search?type=track&q=${cancion}`, this.httpOptions);
  }

  public getGeneros(idAlbum: string): any{
    return this.http.get(this.spotifyEndpoint+`albums/${idAlbum}`, this.httpOptions);
  }

  public getRecomendaciones(idArtista: string, idCancion: string): any{
    return this.http.get(this.spotifyEndpoint+`recommendations?seed_artists=${idArtista}&seed_tracks=${idCancion}&limit=5`, this.httpOptions);
  }
}
