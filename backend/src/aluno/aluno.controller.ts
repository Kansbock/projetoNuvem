import { Body, Controller, Get, Post } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { Aluno } from './aluno.entity';

@Controller('aluno')
export class AlunoController {
    constructor(private readonly service: AlunoService) {}

  @Get()
  findAll(): Promise<Aluno[]> {
    return this.service.findAll();
  }

  @Post()
  create(@Body() data: Partial<Aluno>) {
    return this.service.create(data);
  }
}
