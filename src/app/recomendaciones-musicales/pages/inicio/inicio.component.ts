import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/dev';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent {

  public url = {
    token: environment.AUTH +
    '?client_id=' + environment.client_id + 
    '&response_type=token' +
    '&redirect_uri=' + encodeURIComponent(environment.redirect_uri) +
    '&expires_in=3600'
  }

  constructor (private authService: AuthService, private router: Router) {}

  public spotifyAuth(): void {
    window.location.href = this.url.token;
  }
}
