import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';

@Injectable()
export class UserService {

    constructor(
                    @InjectRepository(User) private userRepository: Repository<User>
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
    
        const newuser = this.userRepository.create(user);
        return await this.userRepository.save(newuser);

    }

    async update(iduser : number, user : User){
        return await this.userRepository.update(iduser, user);
    }

    async login(email : string, password : string){
        return await this.userRepository.find({
            where : {email, password, "stateId" : 1}
        });
    }
}
