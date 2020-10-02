import { Controller, Get, Post, Body, Param, ValidationPipe, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from 'src/Entity/usuario.entity';
import { Logindto } from 'src/Model/usuario/logindto.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('usuario')
export class UsuarioController {

    constructor(private service: UsuarioService) { }

    @ApiBearerAuth()
    @ApiOkResponse({ description: 'List all articles of users feed' })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Get()
    all() {
        return this.service.getallUsuario();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    find(@Param() params) {
        return this.service.getfindUsuario(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    addUsuario(@Body(ValidationPipe) data : Usuario){
        return this.service.saveUsuario(data);
    }

    @Post('/login')
    login(@Body() data : Logindto){
        return this.service.loginUsuario(data.usuario_correo, data.usuario_contrasena);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id')
    updateUsuario(@Body() data : Usuario, @Param() params ){
        return this.service.updateUsuario(params.id, data);
    }

}
