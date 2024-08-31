import { Injectable } from '@nestjs/common';
import { UserService } from 'src/app/user/user.service';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  //TODO:
  //async validateUser(email: string, password: string) {}
}
