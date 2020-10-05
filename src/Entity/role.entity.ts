import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty, IsInt, MaxLength } from 'class-validator';
import { User } from './user.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(
        type => User,
        user => user.role,
    )
    user: User[];

    @IsInt({message : "El campo $property debe ser un número entero"})
    @Column({type : "int", name : "state", nullable: false})
    state: number;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(100, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @Column({type : "varchar", name : "name", length : 100, nullable: false})
    name: string;
}

