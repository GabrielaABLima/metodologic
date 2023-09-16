import { UsuarioRequestDTO } from './../dto/usuario/UserRequestDTO';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  URL:string = "http://localhost:8080/auth"
  constructor(private http: HttpClient) { }

  save(usuario: UsuarioRequestDTO): Observable<any> {
    return this.http.post<UsuarioRequestDTO>(this.URL + `/register`, usuario);
  }
}

