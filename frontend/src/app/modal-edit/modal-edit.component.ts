import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { aluno } from '../types/aluno.interface';

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './modal-edit.component.html',
  styleUrl: './modal-edit.component.scss'
})
export class ModalEditComponent {
  aluno: aluno;
  isEditing: boolean;

  constructor(
    public dialogRef: MatDialogRef<ModalEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: aluno
  ) {
    // Criar uma cópia dos dados para não modificar o original até salvar
    this.aluno = { ...data };
    this.isEditing = data.id !== 0;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.isFormValid()) {
      this.dialogRef.close(this.aluno);
    }
  }

  private isFormValid(): boolean {
    return !!(this.aluno.name && this.aluno.email && this.aluno.address && 
              this.aluno.city && this.aluno.state && this.aluno.phone);
  }
}