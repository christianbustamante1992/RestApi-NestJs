import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty, IsInt, MaxLength } from 'class-validator';
import { Usuario } from './usuario.entity';

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(
        type => Usuario,
        usuario => usuario.rol,
    )
    usuario: Usuario[];

    @IsInt({message : "El campo $property debe ser un número entero"})
    @Column({type : "int", name : "rol_estado", nullable: false})
    rol_estado: number;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(100, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @Column({type : "varchar", name : "rol_nombre", length : 100, nullable: false})
    rol_nombre: string;
}

