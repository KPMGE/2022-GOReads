import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignUpAdminDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  confirmPassword: string
}

