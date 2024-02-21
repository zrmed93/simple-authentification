import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy'; 
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [PassportModule,UsersModule,    JwtModule.register({
    global: true,
    signOptions: { expiresIn: '1d' },
    secret: 'your-secret-key',

  }),
],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
