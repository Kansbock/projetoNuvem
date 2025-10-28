import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { aluno } from '../types/aluno.interface';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { AlunoService } from '../services/aluno.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, MatSnackBarModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'address', 'city', 'state', 'email', 'phone', 'actions'];
  dataSource: aluno[] = [];
  isLoading = true;

  constructor(
    private dialog: MatDialog,
    private alunoService: AlunoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadAlunos();
  }

  loadAlunos(): void {
    this.isLoading = true;
    this.alunoService.findAll().subscribe({
      next: (alunos) => {
        this.dataSource = alunos;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar alunos:', error);
        this.snackBar.open('Erro ao carregar alunos', 'Fechar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  editAluno(aluno: aluno) {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      width: '500px',
      data: aluno
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alunoService.update(result.id, result).subscribe({
          next: (updatedAluno) => {
            const index = this.dataSource.findIndex(a => a.id === updatedAluno.id);
            if (index !== -1) {
              this.dataSource[index] = updatedAluno;
              this.dataSource = [...this.dataSource];
            }
            this.snackBar.open('Aluno atualizado com sucesso!', 'Fechar', { duration: 3000 });
          },
          error: (error) => {
            console.error('Erro ao atualizar aluno:', error);
            this.snackBar.open('Erro ao atualizar aluno', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteAluno(aluno: aluno) {
    if (confirm(`Tem certeza que deseja deletar o aluno ${aluno.name}?`)) {
      this.alunoService.delete(aluno.id).subscribe({
        next: () => {
          this.dataSource = this.dataSource.filter(a => a.id !== aluno.id);
          this.snackBar.open('Aluno deletado com sucesso!', 'Fechar', { duration: 3000 });
        },
        error: (error) => {
          console.error('Erro ao deletar aluno:', error);
          this.snackBar.open('Erro ao deletar aluno', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

  addAluno() {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      width: '500px',
      data: { id: 0, name: '', address: '', city: '', state: '', email: '', phone: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name) {
        const { id, ...alunoData } = result; // Remove o id para criação
        this.alunoService.create(alunoData).subscribe({
          next: (newAluno) => {
            this.dataSource = [...this.dataSource, newAluno];
            this.snackBar.open('Aluno criado com sucesso!', 'Fechar', { duration: 3000 });
          },
          error: (error) => {
            console.error('Erro ao criar aluno:', error);
            this.snackBar.open('Erro ao criar aluno', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }
}
