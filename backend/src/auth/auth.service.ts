import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
      ) {}
    
      async validateUser(email: string, password: string): Promise<User | null> {
        
        const user = await this.userService.findUser(email);
        if (user && (await bcrypt.compare(password, user.password))) {
          return user;
        }
    
        return null; 
      }
    
      async login(user: User): Promise<{ accessToken: string }> {
        const payload = { username: user.username, id: user.id };
    
        return {
          accessToken: this.jwtService.sign(payload),
        };
      }
    

}
