
export class RegistrationDto {
    username?: string;
    password: string;
    email: string;
    role: string;

    constructor(data: RegistrationDto) {
        if (!data.role || !data.password || !data.email) {
          throw new Error('All fields (role, password, email) are required');
        }
    
        this.role = data.role;
        this.password = data.password;
        this.email = data.email;
        this.username = data.username;

      }
    

  }