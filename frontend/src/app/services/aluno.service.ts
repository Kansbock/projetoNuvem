import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { aluno } from '../types/aluno.interface';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = `${environment.apiUrl}/aluno`;

  constructor(private http: HttpClient) { }

  // Buscar todos os alunos
  findAll(): Observable<aluno[]> {
    return this.http.get<aluno[]>(this.apiUrl);
  }

  // Buscar um aluno por ID
  findOne(id: number): Observable<aluno> {
    return this.http.get<aluno>(`${this.apiUrl}/${id}`);
  }

  // Criar um novo aluno
  create(aluno: Partial<aluno>): Observable<aluno> {
    return this.http.post<aluno>(this.apiUrl, aluno);
  }

  // Atualizar um aluno existente
  update(id: number, aluno: Partial<aluno>): Observable<aluno> {
    return this.http.put<aluno>(`${this.apiUrl}/${id}`, aluno);
  }

  // Deletar um aluno
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}