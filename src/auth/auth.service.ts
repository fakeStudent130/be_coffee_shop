import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from './entities/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async registerUser(registerDto: RegisterDto): Promise<object> {
    const { email, password, name } = registerDto;
    const emailExist = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    // return emailExist;

    if (emailExist) throw new UnauthorizedException('Email Already Used');
    const salt = await bcrypt.genSalt();
    const hashingPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      id: uuidv4(),
      name: name,
      email: email,
      password: hashingPassword,
    });
    this.userRepository.save(user);

    return {
      message: 'Register Account Successfully',
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: loginDto.email,
      },
    });
    if (!user) throw new UnauthorizedException('Email Not Found');
    // const passwordUser = user.password;
    // const hashingPassword = await bcrypt.hash();

    // return hashingPassword;
    if (user.password) return user.password;
    // return `This action returns all auth`;
  }
}
