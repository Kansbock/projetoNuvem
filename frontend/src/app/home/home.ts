import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
export interface aluno {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  email: string;
  phone: string;
}
const ELEMENT_DATA: aluno[] = [
  {id: 1, name: 'Matheus', address: 'Rua A, 123', city: 'São Paulo', state: 'SP', email: 'teste', phone: '123456789'},
  {id: 2, name: 'João', address: 'Rua B, 456', city: 'Rio de Janeiro', state: 'RJ', email: 'teste2', phone: '987654321'},
  {id: 3, name: 'Maria', address: 'Rua C, 789', city: 'Belo Horizonte', state: 'MG', email: 'teste3', phone: '456123789'},
];
@Component({
  selector: 'app-home',
  imports: [MatTableModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  displayedColumns: string[] = ['id', 'name', 'address', 'city', 'state', 'email', 'phone'];
  dataSource = ELEMENT_DATA;
}
