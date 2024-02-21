import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [  
      TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost', //host.docker.internal
    port: 3306, 
    username: 'med',
    password: '1234',
    database: 'testdb',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, // Auto-create database tables (only for development, not for production)
    // driver: {
    //   extra: {
    //     insecureAuth: true, 
    //   },
    // },
  
  }),
AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
