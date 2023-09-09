import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../dto/professor/professor.dto';

@Injectable({
  providedIn: 'root'
})

export class TeachersService {
  URL:string = "http://localhost:8080/professores"
  constructor(private http: HttpClient) { }

  save(professor: Professor) : Observable<Professor> {
    return this.http.post<Professor>(this.URL+`/add`, professor)
  }


}

