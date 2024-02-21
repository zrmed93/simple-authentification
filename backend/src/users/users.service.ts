import { Injectable,ConflictException } from '@nestjs/common';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationDto } from 'src/registration.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
    
    async createUser(registrationDto:RegistrationDto): Promise<User> {

        const existingUser = await this.userRepository.findOne( { where:
[            {email: registrationDto.email },
      { username: registrationDto.username }

]        } );
     
        if (existingUser) {
          throw new ConflictException('Email or Username already exists');
        }
    const hashedPassword = await bcrypt.hash(registrationDto.password, 10);
    // if(!registrationDto.username){
    //   registrationDto.username=null
    // }
        const user = await this.userRepository.save({ ...registrationDto, password: hashedPassword });
        return user;
      }
    
      async findUser(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne( { where:
            { email }
        } );
      }

      async findUserByID(id: number): Promise<User | undefined> {
        return await this.userRepository.findOne( { where:
            { id }
        } );
      }

    

}
