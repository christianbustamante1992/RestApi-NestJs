import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from 'src/Entity/usuario.entity';


@Controller('usuario')
export class UsuarioController {

    constructor(private service: UsuarioService) { }

    @Get()
    all() {
        return this.service.getUsuario();
    }

    @Post()
    addUsuario(@Body() data : Usuario){
        return this.service.saveUsuario(data);
    }


}
