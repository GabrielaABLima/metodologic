import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../dto/aluno/aluno.dto';

@Injectable({
  providedIn: 'root'
})

export class StudentsService {
  URL:string = "http://localhost:8080/alunos"
  constructor(private http: HttpClient) { }

  save(aluno: Aluno) : Observable<Aluno> {
    return this.http.post<Aluno>(this.URL+`/add`, aluno)
  }

  getAlunoByNameOrEmail(busca : string) : Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.URL + `/aluno/` + busca);
  }


}

