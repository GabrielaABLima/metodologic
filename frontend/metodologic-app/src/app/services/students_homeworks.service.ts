import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turma } from '../dto/turma/turma.dto';
import { Aluno } from '../dto/aluno/aluno.dto';
import { Questao, QuestaoTarefa } from '../dto/questao/questao.dto';
import { AlunoTarefa, AlunoTarefaResponse } from '../dto/tarefa/tarefa.dto';

@Injectable({
  providedIn: 'root'
})

export class StudentsHomeworksService {
  URL:string = "http://localhost:8080/tarefas_alunos"
  private token = sessionStorage.getItem("token");
  constructor(private http: HttpClient) { }

  add({tarefaId, alunoId, nota}:{tarefaId: number, alunoId: number, nota: number}) : Observable<AlunoTarefa> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<AlunoTarefa>(this.URL+`/add`, {tarefaId, alunoId, nota}, { headers });
  }

  getHomeworksByStudent(alunoId: number):Observable<AlunoTarefaResponse[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<AlunoTarefaResponse[]>(this.URL + `/tarefas/` + alunoId, { headers });
  }

  getStudentsByHomework(tarefaId: number):Observable<AlunoTarefaResponse[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<AlunoTarefaResponse[]>(this.URL + `/alunos/` + tarefaId, { headers });
  }

  deleteQuestionHomework(tarefaId: number, questaoId: number):Observable<Questao>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete<Questao>(this.URL+`/` + tarefaId + "/" + questaoId, { headers });
  }

  getClassesByAluno(alunoId: number): Observable<Turma[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Turma[]>(this.URL+`/turmasByAluno/` + alunoId, { headers });
  }


}

