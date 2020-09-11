import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/Entity/usuario.entity';

@Injectable()
export class UsuarioService {

    constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>) { }

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
        console.log(result)
        return result;
    }

    async updateUsuario(idusuario : number, usuario : Usuario){
        return await this.usuarioRepository.update(idusuario, usuario);
    }

    async loginUsuario(correo : string, contrasena : string){
        return await this.usuarioRepository.find({
            where : {"usuario_correo" : correo, "usuario_contrasena" : contrasena}
        });
    }
}
