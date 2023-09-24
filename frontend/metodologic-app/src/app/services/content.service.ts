import { UsuarioRequestDTO } from './../dto/usuario/UserRequestDTO';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequestDTO } from '../dto/usuario/LoginRequestDTO';
import { LoginResponseDTO } from '../dto/usuario/LoginResponseDTO';
import { Questao } from '../dto/questao/questao.dto';
import { Conteudo } from '../dto/conteudo/conteudo.dto';

@Injectable({
  providedIn: 'root'
})

export class ContentService {
  URL:string = "http://localhost:8080/conteudos"
  private token = sessionStorage.getItem("token");

  constructor(private http: HttpClient) { }

  getRandomContentExceptById(id: number): Observable<Conteudo[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<Conteudo[]>(`${this.URL}/except/${id}`, { headers });
  }

  getRandomContent(): Observable<Conteudo[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<Conteudo[]>(`${this.URL}/random`, { headers });
  }

}

