import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/app/user/user.service';
import { UpdateUserDto } from 'src/app/user/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  //TODO:
  //async validateUser(email: string, password: string) {}
  //

  async signup(signUpDto: SignUpDto) {
    const newUser = SignUpDto.toUser(signUpDto);

    const user = await this.userService.create(newUser);

    const { accessToken, refreshToken } = this.createTokens(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user: newUser };
  }

  createTokens(userId: string, email: string) {
    const accessToken = this.jwtService.sign(
      {
        userId,
        email,
      },
      { expiresIn: '10s', secret: this.configService.get('SECRET') },
    );

    const refreshToken = this.jwtService.sign(
      {
        userId,
        email,
        accessToken,
      },
      { expiresIn: '7d', secret: this.configService.get('SECRET') },
    );

    return { accessToken, refreshToken };
  }

  hashToken(token: string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hash(token, SALT);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const userInfoToBeUpdated = new UpdateUserDto();
    const hashedRefreshedToken = await this.hashToken(refreshToken);
    userInfoToBeUpdated.hashedRefreshToken = hashedRefreshedToken;
    await this.userService.update(userId, userInfoToBeUpdated);
  }
}
