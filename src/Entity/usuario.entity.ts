import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IsEmail, IsString, IsNotEmpty, IsNumberString, MaxLength, Length } from 'class-validator';
import { hash } from 'bcryptjs';
import { Estado } from './estado.entity';
import { Rol } from './rol.entity';

@Entity()
export class Usuario{

    @PrimaryGeneratedColumn()
    usuario_id: number;

    @ManyToOne(type => Estado, estado => estado.id, { eager: true })
    estado: Estado;

    @ManyToOne(type => Rol, rol => rol.id, { eager: true })
    rol: Rol;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @IsNumberString({}, {message : "El campo $property es un valor numérico"})
    @Length(10, 13, {message : "El campo $property debe tener $constraint1 o $constraint2 caracteres"})
    @Column({type : "varchar", name : "usuario_cedula", length : 13, nullable: false, unique: true})
    usuario_cedula: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(200, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @Column({type : "varchar", name : "usuario_nombre", length : 200, nullable: false})
    usuario_nombre: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(200, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @Column({type : "varchar", name : "usuario_apellido", length : 200, nullable: false})
    usuario_apellido: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(100, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @IsEmail({}, {
        message : "El campo $property es inválido"
    })
    @Column({type : "varchar", name : "usuario_correo", length : 100, nullable: false, unique: true})
    usuario_correo: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @IsNumberString({}, {message : "El campo $property es un valor numérico"})
    @Length(10, 10, {message : "El campo $property debe tener $constraint1 o $constraint2 caracteres"})
    @Column({type : "varchar", name : "usuario_telefono", length : 10, nullable: false, unique: true})
    usuario_telefono: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @IsNumberString({}, {message : "El campo $property debe constar de sólo números"})
    @Length(10, 10, {message : "El campo $property debe tener $constraint1 o $constraint2 caracteres"})
    @Column({type : "varchar", name : "usuario_celular", length : 10, nullable: false, unique: true})
    usuario_celular: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(200, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @Column({type : "varchar", name : "usuario_direccion", length : 200, nullable: true})
    usuario_direccion: string;

    @IsString({message : "El campo $property es de tipo string"})
    @MaxLength(200, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @Column({type : "varchar", name : "usuario_nombrefoto", length : 200, nullable: true})
    usuario_nombrefoto: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(200, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @Column({type : "varchar", name : "usuario_contrasena", length : 200, nullable: true})
    usuario_contrasena: string;

}

