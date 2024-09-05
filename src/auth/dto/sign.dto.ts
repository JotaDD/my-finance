import { User } from 'src/app/user/entities/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';
export class SignDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @IsNotEmpty()
  @IsString()
  user: User;
}
