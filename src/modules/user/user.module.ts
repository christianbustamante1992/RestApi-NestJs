import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/entity/user.entity';
import { jwtConstants } from '../../constants/keyjwt';
import { JwtStrategy } from '../auth/jwt.strategy';


@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '5m' },
        }),
    ],
    controllers: [
        UserController 
    ],
    providers: [
        UserService,
        JwtStrategy 
    ],

})
export class UserModule {}
