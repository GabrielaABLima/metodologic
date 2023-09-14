import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turma } from '../dto/turma/turma.dto';

@Injectable({
  providedIn: 'root'
})

export class ClassesService {
  URL:string = "http://localhost:8080/turmas"
  constructor(private http: HttpClient) { }

  save(turma: Turma) : Observable<Turma> {
    return this.http.post<Turma>(this.URL+`/add`, turma)
  }

  getClassesByProfessor(professorId: number): Observable<Turma[]>{
    return this.http.get<Turma[]>(this.URL+`/professor/` + professorId);
  }


}

