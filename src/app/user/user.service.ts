import { Injectable, ConflictException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(newUser: CreateUserDto) {
    const userExists = await this.findByEmail(newUser.email);

    if (userExists) {
      throw new ConflictException('User already registered');
    }

    return await this.prisma.user.create({ data: newUser });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email: email, isActive: true },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }

  async remove(id: string) {
    await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
