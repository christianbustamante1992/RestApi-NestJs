import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/Entity/usuario.entity';

@Injectable()
export class UsuarioService {

    constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>, private jwtService: JwtService) { }

    async getallUsuario() {
        return await this.usuarioRepository.find();
    }

    async getfindUsuario(idusuario : number) {
        return await this.usuarioRepository.find({
            where : {"usuario_id" : idusuario}
        });
    }

    async saveUsuario(usuario : Usuario){
        const result = await this.usuarioRepository.insert(usuario);
        return {message: "Usuario Creado", data : usuario, response: result};
    }

    async updateUsuario(idusuario : number, usuario : Usuario){
        return await this.usuarioRepository.update(idusuario, usuario);
    }

    async loginUsuario(correo : string, contrasena : string){
        const user = await this.usuarioRepository.find({
            where : {"usuario_correo" : correo, "usuario_contrasena" : contrasena, "estadoId" : 1}
        });

        if(user.length == 0) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { email : correo, password: contrasena };

        return {
                    message: "Inicio de sesion correcto",
                    data: user,
                    token: this.jwtService.sign(payload)
                };
    }
}
