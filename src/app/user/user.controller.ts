import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { encodePassword } from 'src/utils/bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const password = await encodePassword(createUserDto.password);

    return await this.userService.create({ ...createUserDto, password });
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('email')
  async findOne(@Body() data) {
    try {
      return await this.userService.findByEmail(data.email);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
