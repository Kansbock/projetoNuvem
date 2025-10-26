import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { aluno } from './home/home';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Aluno {
  private apiUrl = 'http://<IP_DA_EC2>:3000/usuarios'; // ou domínio da API

  constructor(private http: HttpClient) {}

  listarUsuarios(): Observable<aluno[]> {
    return this.http.get<aluno[]>(this.apiUrl);
  }

  criarUsuario(usuario: Partial<aluno>): Observable<aluno> {
    return this.http.post<aluno>(this.apiUrl, usuario);
  }
}
