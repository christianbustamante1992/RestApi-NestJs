import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from 'src/entity/role.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleService } from './role.service';

@ApiTags('Roles')
@Controller('role')
export class RoleController {

    constructor(
        private serviceRole : RoleService
    ){}

    @ApiBearerAuth()
    @ApiOkResponse({ description: 'List all roles' })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Get()
    async allRoles() {
        const data = await this.serviceRole.all();
        return {
            total : data.length,
            result : data,
            message : (data.length > 0) ? "" : "No se ha encontrado información.",
            type : (data.length > 0) ? "success" : "error"
        }
    }

    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Filter role by Id' })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findRole(@Param() params) {
        const data = await this.serviceRole.findById(params.id);
        return {
            total : data.length,
            result : data,
            message : (data.length > 0) ? "" : "No se ha encontrado información.",
            type : (data.length > 0) ? "success" : "error"
        }
    }

    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Update a role by Id' })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Post(':id')
    async updateRole(@Body(ValidationPipe) data : Role, @Param() params ){

        try {
            
            const response = await this.serviceRole.update(params.id, data);

            if(response.affected > 0){

                return {
                    result : data,
                    message : "Se ha modificado correctamente",
                    type : "success"
                }

            }else{
                return {
                    result : {},
                    message : "No se ha encontrado el usuario a modificar",
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
    @ApiOkResponse({ description: 'Create role' })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Post()
    async createRole(@Body(ValidationPipe) data : Role){

        try {
            
            await this.serviceRole.add(data);

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
