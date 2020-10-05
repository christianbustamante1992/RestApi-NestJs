import { Controller, Get, Post, Body, Param, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entity/user.entity';
import { Logindto } from 'src/model/user/logindto.class';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

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
            console.log(error)
            return {
                result : data,
                message : error.message,
                type : "error"
            }
        }
    }

    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Update a user by Id' })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Post(':id')
    updateUser(@Body() data : User, @Param() params ){

        try {
            
            this.service.update(params.id, data);

            return {
                result : data,
                message : "Se ha modificado correctamente",
                type : "success"
            }

        } catch (error) {
            
            console.log(error)
            
            return {
                result : data,
                message : "No se ha modificado correctamente",
                type : "error"
            }
        }
    }

    @ApiOkResponse({ description: 'Get the users data with its token' })
    @Post('/login')
    async login(@Body(ValidationPipe) data : Logindto){
        const user = await this.service.login(data.email, data.password);

        if(user.length == 0) {
            return {
                total : user.length,
                data: user,
                message: "Inicio de sesion incorrecto. Usuario no encontrado",
                type : "warning",
                token: ""
            };
        }

        const payload = { email : data.email , password : data.password };

        return {
                    total: user.length,
                    data: user,
                    message: "Inicio de sesion correcto",
                    type : "success",
                    token: this.jwtService.sign(payload)
                };
    }

}
