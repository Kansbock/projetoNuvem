"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlunoService = void 0;
const common_1 = require("@nestjs/common");
const aluno_entity_1 = require("./aluno.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let AlunoService = class AlunoService {
    alunoRepo;
    constructor(alunoRepo) {
        this.alunoRepo = alunoRepo;
    }
    findAll() {
        return this.alunoRepo.find();
    }
    create(data) {
        const novo = this.alunoRepo.create(data);
        return this.alunoRepo.save(novo);
    }
    async findOne(id) {
        const aluno = await this.alunoRepo.findOne({ where: { id } });
        if (!aluno) {
            throw new common_1.NotFoundException('Aluno não encontrado');
        }
        return aluno;
    }
    async update(id, data) {
        const aluno = await this.findOne(id);
        this.alunoRepo.merge(aluno, data);
        return this.alunoRepo.save(aluno);
    }
    async delete(id) {
        const aluno = await this.findOne(id);
        return this.alunoRepo.remove(aluno);
    }
};
exports.AlunoService = AlunoService;
exports.AlunoService = AlunoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(aluno_entity_1.Aluno)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AlunoService);
//# sourceMappingURL=aluno.service.js.map