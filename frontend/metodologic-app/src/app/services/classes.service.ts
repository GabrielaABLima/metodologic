import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turma } from '../dto/turma/turma.dto';

@Injectable({
  providedIn: 'root'
})

export class ClassesService {
  URL:string = "http://localhost:8080/turmas"
  private token = sessionStorage.getItem("token");

  constructor(private http: HttpClient) { }

  save(turma: Turma) : Observable<Turma> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<Turma>(this.URL+`/add`, turma, { headers })
  }

  getClassesByProfessor(professorId: number): Observable<Turma[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Turma[]>(this.URL+`/professor/` + professorId, { headers });
  }

  getClassByCode(code: string): Observable<Turma>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Turma>(this.URL+`/codigo/` + code, { headers });
  }


}

