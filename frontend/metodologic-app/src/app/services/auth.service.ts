import { UsuarioRequestDTO } from './../dto/usuario/UserRequestDTO';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequestDTO } from '../dto/usuario/LoginRequestDTO';
import { LoginResponseDTO } from '../dto/usuario/LoginResponseDTO';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  URL:string = "http://localhost:8080/auth"
  constructor(private http: HttpClient) { }

  register(usuario: UsuarioRequestDTO): Observable<any> {
    return this.http.post<UsuarioRequestDTO>(this.URL + `/register`, usuario);
  }

  login(credentials: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(this.URL + `/login`, credentials);
  }
}

