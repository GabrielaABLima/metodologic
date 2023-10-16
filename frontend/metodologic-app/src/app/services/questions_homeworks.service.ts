import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turma } from '../dto/turma/turma.dto';
import { Aluno } from '../dto/aluno/aluno.dto';
import { Questao, QuestaoTarefa } from '../dto/questao/questao.dto';

@Injectable({
  providedIn: 'root'
})

export class QuestionsHomeworksService {
  URL:string = "http://localhost:8080/tarefas_questoes"
  private token = sessionStorage.getItem("token");
  constructor(private http: HttpClient) { }

  add({tarefaId, questaoId}:{tarefaId: number, questaoId: number}) : Observable<Questao> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<Questao>(this.URL+`/add`, {tarefaId, questaoId}, { headers });
  }

  getQuestionsByHomework(tarefaId: number):Observable<Questao[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Questao[]>(this.URL + `/` + tarefaId, { headers });
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

