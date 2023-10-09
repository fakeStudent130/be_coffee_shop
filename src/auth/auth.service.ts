import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from './entities/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
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
    const salt = bcrypt.genSaltSync();
    const hashingPassword = await bcrypt.hashSync(password, salt);
    const user = this.userRepository.create({
      id: uuidv4(),
      name: name,
      email: email,
      password: hashingPassword,
    });
    await this.userRepository.save(user);
    // return hashingPassword;

    return {
      message: 'Register Account Successfully',
      pass: hashingPassword,
    };
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: loginDto.email,
        },
      });
      if (!user) throw new UnauthorizedException('Email Not Found');
      const match = await bcrypt.compare(loginDto.password, user.password);
      if (!match) throw new UnauthorizedException('Wrong Password');

      const payload = { id: user.id, name: user.name };
      const Accesstoken = await this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN,
        expiresIn: '30d',
      });

      return {
        Accesstoken,
      };
    } catch (error) {
      return error.message;
    }
  }
}
