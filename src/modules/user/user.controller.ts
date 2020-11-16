import { Controller, Get, Post, Body, Param, ValidationPipe, UseGuards, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entity/user.entity';
import { Logindto } from 'src/model/user/logindto.class';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

@ApiTags('Users')
@Controller('user')
export class UserController {

    constructor(
                    private service: UserService, 
                    private jwtService: JwtService
                ) { }

    @ApiBearerAuth()
    @ApiOkResponse({ description: 'List all users' })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Get()
    async all() {
        const data = await this.service.all();
        return {
            total : data.length,
            result : data,
            message : (data.length > 0) ? "" : "No se ha encontrado información.",
            type : (data.length > 0) ? "success" : "error"
        }
    }

    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Filter user by Id' })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async find(@Param() params) {
        const data = await this.service.findById(params.id);
        return {
            total : data.length,
            result : data,
            message : (data.length > 0) ? "" : "No se ha encontrado información.",
            type : (data.length > 0) ? "success" : "error"
        }
    }

    @ApiOkResponse({ description: 'Get the users data with its token' })
    @Post('login')
    async login(@Body(ValidationPipe) data : Logindto){
        const user = await this.service.login(data.email);

        if(user.length == 0) {
            return {
                total : user.length,
                data: user,
                message: "Inicio de sesion incorrecto. Usuario no encontrado",
                type : "warning",
                token: ""
            };
        }

        if(await compare(data.password, user[0].password)){

            const payload = { email : data.email , password : data.password };
    
            return {
                        total: user.length,
                        data: user,
                        message: "Inicio de sesion correcto",
                        type : "success",
                        token: this.jwtService.sign(payload)
                    }; 
        }else{
            return {
                total : 0,
                data: [],
                message: "Inicio de sesion incorrecto. Usuario no encontrado",
                type : "warning",
                token: ""
            };
        }

    }

    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Update a user by Id' })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Post(':id')
    async updateUser(@Body(ValidationPipe) data : User, @Param() params ){

        try {
            
            const response = await this.service.update(params.id, data);

            if(response.affected > 0){

                return {
                    result : data,
                    message : "Se ha modificado correctamente",
                    type : "success"
                }

            }else{
                return {
                    result : {},
                    message : "No se ha encontrado el usuario a modificar",
                    type : "error"
                }
            }


        } catch (error) {
            
            return {
                result : error,
                message : "No se ha modificado correctamente",
                type : "error"
            }
        }
    }

    @ApiOkResponse({ description: 'Create user' })
    @Post()
    async addUser(@Body(ValidationPipe) data : User){

        try {
            
            await this.service.add(data);

            return {
                result : data,
                message : "Se ha creado correctamente",
                type : "success"
            }

        } catch (error) {
            
            return {
                result : data,
                message : error.detail,
                type : "error"
            }
        }
    }

}
