import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from 'src/Entity/usuario.entity';
import { Logindto } from 'src/Model/usuario/logindto.interface';


@Controller('usuario')
export class UsuarioController {

    constructor(private service: UsuarioService) { }

    @Get()
    all() {
        return this.service.getallUsuario();
    }

    @Get(':id')
    find(@Param() params) {
        return this.service.getfindUsuario(params.id);
    }

    @Post()
    addUsuario(@Body() data : Usuario){
        return this.service.saveUsuario(data);
    }

    @Post('/login')
    login(@Body() data : Logindto){
        return this.service.loginUsuario(data.usuario_correo, data.usuario_contrasena);
    }

    @Post(':id')
    updateUsuario(@Body() data : Usuario, @Param() params ){
        return this.service.updateUsuario(params.id, data);
    }

}
