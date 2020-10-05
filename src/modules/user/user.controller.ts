import { Controller, Get, Post, Body, Param, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entity/user.entity';
import { Logindto } from 'src/model/user/logindto.class';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {

    constructor(private service: UserService) { }

    @ApiBearerAuth()
    @ApiOkResponse({ description: 'List all articles of users feed' })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Get()
    all() {
        return this.service.all();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    find(@Param() params) {
        return this.service.findById(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    addUser(@Body(ValidationPipe) data : User){
        return this.service.add(data);
    }

    @Post('/login')
    login(@Body(ValidationPipe) data : Logindto){
        return this.service.login(data.email, data.password);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id')
    updateUser(@Body() data : User, @Param() params ){
        return this.service.update(params.id, data);
    }

}
