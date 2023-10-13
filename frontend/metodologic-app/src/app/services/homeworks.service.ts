import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Tarefa, TarefaCreate } from "../dto/tarefa/tarefa.dto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class HomeworksService {
  URL:string = "http://localhost:8080/tarefas"
  private token = sessionStorage.getItem("token");

  constructor(private http: HttpClient) { }

  save(tarefa: TarefaCreate) : Observable<Tarefa> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<Tarefa>(this.URL+`/add`, tarefa, { headers })
  }

  getHomeworksByProfessor(professorId: number): Observable<Tarefa[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Tarefa[]>(this.URL+`/professor/` + professorId, { headers });
  }
}
