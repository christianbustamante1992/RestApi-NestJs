import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty, IsInt, MaxLength } from 'class-validator';
import { Usuario } from './usuario.entity';

@Entity()
export class Estado {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(
        type => Usuario,
        usuario => usuario.estado,
    )
    usuario: Usuario[];

    @IsInt({message : "El campo $property debe ser un número entero"})
    @Column({type : "int", name : "estado_estado", nullable: false})
    estado_estado: number;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(100, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @Column({type : "varchar", name : "estado_nombre", length : 100, nullable: false})
    estado_nombre: string;
}

