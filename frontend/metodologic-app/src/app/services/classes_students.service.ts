import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turma } from '../dto/turma/turma.dto';
import { Aluno } from '../dto/aluno/aluno.dto';

@Injectable({
  providedIn: 'root'
})

export class ClassesStudentsService {
  URL:string = "http://localhost:8080/turmas_alunos"
  constructor(private http: HttpClient) { }

  add({turmaCod, alunoId}:{turmaCod: string, alunoId: number}) : Observable<Turma> {
    return this.http.post<Turma>(this.URL+`/add`, {turmaCod, alunoId});
  }

  getAlunosByTurma(turmaCod: string):Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.URL+`/alunosByTurma/` + turmaCod);
  }

  removerAlunoTurma(alunoId: number, turmaCod: string): void{
    this.http.delete(this.URL+`/removerAlunoTurma/` + alunoId + "/" + turmaCod);
  }


}

