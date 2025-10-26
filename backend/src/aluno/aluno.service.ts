import { Injectable } from '@nestjs/common';
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

    async update(id: number, data: Partial<Aluno>) {
        const aluno = await this.alunoRepo.findOne({ where: { id } });
        if (!aluno) {
            throw new Error('Aluno não encontrado');
        }
        this.alunoRepo.merge(aluno, data);
        return this.alunoRepo.save(aluno);
    }

    async delete(id: number) {
        const aluno = await this.alunoRepo.findOne({ where: { id } });
        if (!aluno) {
            throw new Error('Aluno não encontrado');
        }
        return this.alunoRepo.remove(aluno);
    }
}
