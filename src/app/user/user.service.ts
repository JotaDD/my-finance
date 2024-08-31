import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({ data: createUserDto });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: { email: email, isActive: true },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  //findOne(id: number) {
  //  return `This action returns a #${id} user`;
  //}
  //
  //update(id: number, updateUserDto: UpdateUserDto) {
  //  return `This action updates a #${id} user`;
  //}
  //
  //remove(id: number) {
  //  return `This action removes a #${id} user`;
  //}
}
