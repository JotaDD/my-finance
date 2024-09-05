import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/app/user/user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, UserService],
})
export class AuthModule {}
