import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsEmail, IsString, IsNotEmpty, IsNumberString, MaxLength, Length, IsBoolean } from 'class-validator';
import { State } from './state.entity';
import { Role } from './role.entity';

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
                    type => State, 
                    state => state.id, 
                    { eager: true }
                )
    state: State;

    @ManyToOne(
                    type => Role, 
                    role => role.id, 
                    { eager: true }
                )
    role: Role;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @IsNumberString({}, {message : "El campo $property es un valor numérico"})
    @Length(10, 13, {message : "El campo $property debe tener $constraint1 o $constraint2 caracteres"})
    @Column({type : "varchar", name : "identification", length : 13, nullable: false, unique: true})
    identification: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(200, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @Column({type : "varchar", name : "name", length : 200, nullable: false})
    name: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(200, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @Column({type : "varchar", name : "surname", length : 200, nullable: false})
    surname: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(100, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @IsEmail({}, {
        message : "El campo $property es inválido"
    })
    @Column({type : "varchar", name : "email", length : 100, nullable: false, unique: true})
    email: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @IsNumberString({}, {message : "El campo $property es un valor numérico"})
    @Length(10, 10, {message : "El campo $property debe tener $constraint1 o $constraint2 caracteres"})
    @Column({type : "varchar", name : "phone", length : 10, nullable: false, unique: true})
    phone: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @IsNumberString({}, {message : "El campo $property debe constar de sólo números"})
    @Length(10, 10, {message : "El campo $property debe tener $constraint1 o $constraint2 caracteres"})
    @Column({type : "varchar", name : "cellphone", length : 10, nullable: false, unique: true})
    cellphone: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(200, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @Column({type : "varchar", name : "address", length : 200, nullable: false})
    address: string;

    @IsString({message : "El campo $property es de tipo string"})
    @MaxLength(200, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @Column({type : "varchar", name : "photo", length : 200, nullable: true})
    photo: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(200, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @Column({type : "varchar", name : "password", length : 200, nullable: false})
    password: string;

    @IsBoolean({message : "El campo $property es de tipo boolean"})
    @Column({type : "boolean", name : "verified", nullable: true})
    verified: boolean;

}

