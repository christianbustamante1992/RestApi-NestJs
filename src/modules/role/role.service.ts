import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entity/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>
    ) { }

    async all() {
        
        return await this.roleRepository.find();

    }

    async findById(idrole : number) {
        
        return await this.roleRepository.find({
            where : {"id" : idrole}
        });

    }

    async add(role : Role){

        const newrole = this.roleRepository.create(role);
        return await this.roleRepository.save(newrole);

    }

    async update(idrole : number, role : Role){
        
        const newrole = this.roleRepository.create(role);
        return await this.roleRepository.update(idrole, newrole);
        
    }
}
