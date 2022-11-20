import {  BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { hash, verify } from 'argon2';
import { PrismaService } from '../prisma/prisma.service'
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signin(dto: SignInDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email
      }
    })
    if (!user) throw new BadRequestException('Wrong credentials') 

    const passwordMatch = await verify(user.hased_password, dto.password)
    if (!passwordMatch) throw new BadRequestException('Wrong credentials') 

    return dto
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
