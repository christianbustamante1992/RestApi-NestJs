import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from 'src/entity/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {

    constructor(
        @InjectRepository(State) private stateRepository: Repository<State>
    ) { }

    async all() {
        
        return await this.stateRepository.find();

    }

    async findById(idstate : number) {
        
        return await this.stateRepository.find({
            where : {"id" : idstate}
        });

    }

    async add(state : State){

        const newstate = this.stateRepository.create(state);
        return await this.stateRepository.save(newstate);

    }

    async update(idstate : number, state : State){
        
        const newstate = this.stateRepository.create(state);
        return await this.stateRepository.update(idstate, newstate);
        
    }
}
