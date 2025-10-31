import { AlunoService } from './aluno.service';
import { Aluno } from './aluno.entity';
export declare class AlunoController {
    private readonly service;
    constructor(service: AlunoService);
    findAll(): Promise<Aluno[]>;
    findOne(id: string): Promise<Aluno>;
    create(data: Partial<Aluno>): Promise<Aluno>;
    update(id: string, data: Partial<Aluno>): Promise<Aluno>;
    delete(id: string): Promise<Aluno>;
}
