import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor ( private http: HttpClient ) {}

  public credenciales = {
    client_id: environment.client_id,
    client_secret: environment.client_secret,
    access_token: ''
  }

  public URIs = {
    authURI: environment.AUTH +
    '?client_id=' + this.credenciales.client_id + 
    '&response_type=token' +
    '&redirect_uri=' + encodeURIComponent(environment.redirect_uri) +
    '&expires_in=3600'
  }
}
