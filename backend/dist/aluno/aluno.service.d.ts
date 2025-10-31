import { Aluno } from './aluno.entity';
import { Repository } from 'typeorm';
export declare class AlunoService {
    private alunoRepo;
    constructor(alunoRepo: Repository<Aluno>);
    findAll(): Promise<Aluno[]>;
    create(data: Partial<Aluno>): Promise<Aluno>;
    findOne(id: number): Promise<Aluno>;
    update(id: number, data: Partial<Aluno>): Promise<Aluno>;
    delete(id: number): Promise<Aluno>;
}
