import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Usuario } from 'src/Entity/usuario.entity';
import { jwtConstants } from '../../constants/keyjwt';
import { JwtStrategy } from '../auth/jwt.strategy';


@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '5m' },
        }),
    ],
    controllers: [
        UsuarioController 
    ],
    providers: [
        UsuarioService,
        JwtStrategy 
    ],

})
export class UsuarioModule {}
