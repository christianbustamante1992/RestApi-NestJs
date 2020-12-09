import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { State } from 'src/entity/state.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StateService } from './state.service';

@ApiTags('States')
@Controller('state')
export class StateController {

    constructor(
        private serviceState : StateService
    ){}

    @ApiBearerAuth()
    @ApiOkResponse({ description: 'List all states' })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Get()
    async allStates() {
        const data = await this.serviceState.all();
        return {
            total : data.length,
            result : data,
            message : (data.length > 0) ? "" : "No se ha encontrado información.",
            type : (data.length > 0) ? "success" : "error"
        }
    }

    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Filter state by Id' })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findState(@Param() params) {
        const data = await this.serviceState.findById(params.id);
        return {
            total : data.length,
            result : data,
            message : (data.length > 0) ? "" : "No se ha encontrado información.",
            type : (data.length > 0) ? "success" : "error"
        }
    }

    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Update a state by Id' })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Post(':id')
    async updateState(@Body(ValidationPipe) data : State, @Param() params ){

        try {
            
            const response = await this.serviceState.update(params.id, data);

            if(response.affected > 0){

                return {
                    result : data,
                    message : "Se ha modificado correctamente",
                    type : "success"
                }

            }else{
                return {
                    result : {},
                    message : "No se ha encontrado el estado a modificar",
                    type : "error"
                }
            }


        } catch (error) {
            
            return {
                result : error,
                message : "No se ha modificado correctamente",
                type : "error"
            }
        }
    }

    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Create state' })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Post()
    async createState(@Body(ValidationPipe) data : State){

        try {
            
            await this.serviceState.add(data);

            return {
                result : data,
                message : "Se ha creado correctamente",
                type : "success"
            }

        } catch (error) {
            
            return {
                result : data,
                message : error.detail,
                type : "error"
            }
        }
    }
}
