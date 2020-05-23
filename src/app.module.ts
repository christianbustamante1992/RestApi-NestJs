import { UsuarioModule } from './modules/usuario/usuario.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './Entity/usuario.entity';
import { Rol } from './Entity/rol.entity';
import { Estado } from './Entity/estado.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "nestrestaurant",
      synchronize: true,
      entities: [
          Usuario,
          Rol,
          Estado
      ]
    }),
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
