
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './modules/usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "us-cdbr-east-02.cleardb.com",
      port: 3306,
      username: "b227ad44782a5c",
      password: "17c2bdf6",
      database: "heroku_0713714f69c97d2",
      synchronize: true,
      entities: ['dist/**/*.entity.js']
    }),
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
