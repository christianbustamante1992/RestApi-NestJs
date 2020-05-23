import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/Entity/usuario.entity';

@Injectable()
export class UsuarioService {

    constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>) { }

    async getUsuario() {
        return await this.usuarioRepository.find();
    }

    async saveUsuario(usuario : Usuario){
        return await this.usuarioRepository.insert(usuario);
    }
}
