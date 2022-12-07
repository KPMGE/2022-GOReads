import { Body, Controller,  HttpCode,  HttpStatus,  Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpAdminDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signupAdmin')
  signupAdmin(@Body() dto: SignUpAdminDto) {
   return this.authService.signupAdmin(dto)
  }

  @Post('signin')
  signin(@Body() dto: SignInDto) {
   return this.authService.signin(dto)
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: SignUpDto) {
   return this.authService.signup(dto)
  }
}
