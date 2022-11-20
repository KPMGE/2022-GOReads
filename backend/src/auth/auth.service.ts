import {  BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { hash } from 'argon2';
import { PrismaService } from '../prisma/prisma.service'
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  signin(dto: SignInDto) {
  }

  async signup(dto: SignUpDto) {
    const passwordsMatch = dto.password === dto.confirmPassword
    if (!passwordsMatch) throw new BadRequestException('password and confirmPassword must match') 

    const hashedPassword = await hash(dto.password)

    try {
      await this.prismaService.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          hased_password: hashedPassword
        }
      })

      return dto
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('credentials already taken')
        }
      }
      throw error
    }
  }
}
