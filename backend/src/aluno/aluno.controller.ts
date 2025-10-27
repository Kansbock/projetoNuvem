import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { Aluno } from './aluno.entity';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly service: AlunoService) {}

  @Get()
  findAll(): Promise<Aluno[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Aluno> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Aluno>) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Aluno>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
