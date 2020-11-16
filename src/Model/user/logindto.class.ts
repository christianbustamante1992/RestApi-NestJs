import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class Logindto {
    
    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(100, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @IsEmail({}, {
        message : "El campo $property es inválido"
    })
    @ApiProperty()
    email : string;

    @IsString({message : "El campo $property es de tipo string"})
    @IsNotEmpty({message : "El campo $property es requerido"})
    @MaxLength(200, {message : "El campo $property debe tener como máximo $constraint1 caracteres"})
    @ApiProperty()
    password : string;
}
