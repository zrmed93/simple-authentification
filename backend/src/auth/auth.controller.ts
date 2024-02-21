import { Controller, Post, Body, UnauthorizedException,Request,HttpException, HttpStatus,BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegistrationDto } from 'src/registration.dto';

@Controller('auth')
 
export class AuthController {

    constructor(
        private authService: AuthService,
        private userService: UsersService,
      ) {}
    
      @Post('register')
      async register(@Body() body) {

        try {
          const registrationData = new RegistrationDto(body);

          const user = await this.userService.createUser(registrationData) ;
          return ` user with email ${user.email} sucessfully created`
        } catch (error) {
          console.log(error)
           throw new BadRequestException(error.message);
          return {error,message :error.message}
        //  throw new UnauthorizedException('Registration failed');
        }
      }
      @Post('login')
      async login(@Request() req) {
        try{
          const {email,password} = req.body
          console.log(req.body)
           const user = await this.authService.validateUser(email, password);
       
           if (!user) {
             throw new UnauthorizedException('Invalid credentials');
           }
       
           return this.authService.login(user);
        }
        catch(error){
        //  throw new BadRequestException(error.message);
                     return {error,message :error.message, status:HttpStatus.BAD_REQUEST}
                     throw new UnauthorizedException('Login failed');

        }
      }
    
}
