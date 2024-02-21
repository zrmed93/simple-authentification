import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './users.entity';
import { UsersService } from './users.service';




@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        console.log(req?.user)
      // The user object is attached to the request by the JwtAuthGuard
      const userId = req?.user?.id; // Assuming you have a 'id' property in your User entity
      if(userId){
          const user = await this.userService.findUserByID(userId);
          const {password, ...userData} = user
          return userData;
      }
      else return "no user found"
      // Omitting sensitive information before sending the response
  
      //return req.user;
    }

    @Get()
    getHell(): string {
        return "fdfd";
      }
    
  
}
