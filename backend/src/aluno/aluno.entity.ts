import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Aluno {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    email: string;

    @Column()
    phone: string;
}