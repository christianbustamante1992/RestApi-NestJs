import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumberString, Length, MaxLength, IsEmail, IsBoolean, IsInt } from "class-validator";

export class Userdto {

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @IsNumberString({}, {message : "El campo $property es un valor numérico"})
    @Length(10, 13, {message : "El campo $property debe tener $constraint1 o $constraint2 caracteres"})
    @ApiProperty()
    identification: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(200, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @ApiProperty()
    name: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(200, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @ApiProperty()
    surname: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(100, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @IsEmail({}, {
        message : "El campo $property es inválido"
    })
    @ApiProperty()
    email: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @IsNumberString({}, {message : "El campo $property es un valor numérico"})
    @Length(10, 10, {message : "El campo $property debe tener $constraint1 o $constraint2 caracteres"})
    @ApiProperty()
    phone: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @IsNumberString({}, {message : "El campo $property debe constar de sólo números"})
    @Length(10, 10, {message : "El campo $property debe tener $constraint1 o $constraint2 caracteres"})
    @ApiProperty()
    cellphone: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(200, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @ApiProperty()
    address: string;

    @IsString({message : "El campo $property es de tipo string"})
    @MaxLength(200, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @ApiProperty()
    photo: string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(20, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @ApiProperty()
    password: string;

    @IsBoolean({message : "El campo $property es de tipo boolean"})
    @ApiProperty()
    verified: boolean;

    @IsInt({message : "El campo $property debe ser un número entero"})
    @ApiProperty()
    state: number;

    @IsInt({message : "El campo $property debe ser un número entero"})
    @ApiProperty()
    role: number;
}