import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/Entity/usuario.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario])
    ],
    controllers: [
        UsuarioController 
    ],
    providers: [
        UsuarioService 
    ],

})
export class UsuarioModule {}