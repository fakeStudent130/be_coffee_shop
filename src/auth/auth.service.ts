import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { register } from 'module';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

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

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
