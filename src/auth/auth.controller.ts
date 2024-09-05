import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { encode } from 'src/utils/bcrypt';
import { SignUpDto } from './dto/signup.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() data: SignUpDto) {
    const hashedPassword = await encode(data.password);
    return await this.authService.signup({ ...data, password: hashedPassword });
  }
}
