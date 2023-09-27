import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../dto/aluno/aluno.dto';
import { Usuario } from '../dto/usuario/UsuarioDTO';
import { UpdateUserRequestDTO } from '../dto/usuario/UpdateUserRequestDTO';
import { CheckLoginResponseDTO } from '../dto/usuario/CheckLoginResponseDTO';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  URL:string = "http://localhost:8080/usuarios"
  private token = sessionStorage.getItem("token");
  constructor(
    private http: HttpClient,
    private router: Router,) { }

  getById(id : number) : Observable<Usuario> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Usuario>(this.URL + `/all/` + id, { headers });
  }

  updateUser(id: number, updateUser: UpdateUserRequestDTO){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put<UpdateUserRequestDTO>(this.URL + "/" + id, updateUser, { headers });
  }

  updateUserPoints(id: number, pontos: number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put<Usuario>(this.URL + "/pontos/" + id, {"pontos": pontos}, { headers });
  }

}

