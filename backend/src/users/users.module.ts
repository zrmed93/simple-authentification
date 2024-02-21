import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
///import { JwtStrategy } from '../jwt.strategy'; 
//import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';




@Module({
  imports: [TypeOrmModule.forFeature([User])],

  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],

})
export class UsersModule {}
