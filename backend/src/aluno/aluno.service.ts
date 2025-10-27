import { Injectable, NotFoundException } from '@nestjs/common';
import { Aluno } from './aluno.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepo: Repository<Aluno>,
  ) {}

  findAll() {
    return this.alunoRepo.find();
  }
  create(data: Partial<Aluno>) {
    const novo = this.alunoRepo.create(data);
    return this.alunoRepo.save(novo);
  }

  async findOne(id: number) {
    const aluno = await this.alunoRepo.findOne({ where: { id } });
    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }
    return aluno;
  }

  async update(id: number, data: Partial<Aluno>) {
    const aluno = await this.findOne(id);
    this.alunoRepo.merge(aluno, data);
    return this.alunoRepo.save(aluno);
  }

  async delete(id: number) {
    const aluno = await this.findOne(id);
    return this.alunoRepo.remove(aluno);
  }
}
