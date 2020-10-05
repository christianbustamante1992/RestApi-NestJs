import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';

@Injectable()
export class UserService {

    constructor(
                    @InjectRepository(User) private userRepository: Repository<User>, 
                    private jwtService: JwtService
                ) { }

    async all() {
        return await this.userRepository.find();
    }

    async findById(iduser : number) {
        return await this.userRepository.find({
            where : {"id" : iduser}
        });
    }

    async add(user : User){
        const result = await this.userRepository.insert(user);
        return {message: "Usuario Creado", data : user, response: result};
    }

    async update(iduser : number, user : User){
        return await this.userRepository.update(iduser, user);
    }

    async login(email : string, password : string){
        const user = await this.userRepository.find({
            where : {email, password, "stateId" : 1}
        });

        if(user.length == 0) {
            return {
                message: "Inicio de sesion incorrecto. Usuario no encontrado",
                data: user,
                token: ""
            };
        }

        const payload = { email , password };

        return {
                    message: "Inicio de sesion correcto",
                    data: user,
                    token: this.jwtService.sign(payload)
                };
    }
}
