import { UsuarioRequestDTO } from './../dto/usuario/UserRequestDTO';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequestDTO } from '../dto/usuario/LoginRequestDTO';
import { LoginResponseDTO } from '../dto/usuario/LoginResponseDTO';
import { Questao } from '../dto/questao/questao.dto';

@Injectable({
  providedIn: 'root'
})

export class QuestionService {
  URL:string = "http://localhost:8080/questoes"
  private token = sessionStorage.getItem("token");

  constructor(private http: HttpClient) { }

  getByModule(nivel: number): Observable<Questao[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<Questao[]>(`${this.URL}/module/${nivel}`, { headers });
  }

}

