import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from 'src/app/user/dto/create-user.dto';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  static toUser(signUpDto: SignUpDto) {
    const newUserDto = new CreateUserDto();

    newUserDto.name = signUpDto.name;
    newUserDto.hashedPassword = signUpDto.password;
    newUserDto.email = signUpDto.email;

    return newUserDto;
  }
}
