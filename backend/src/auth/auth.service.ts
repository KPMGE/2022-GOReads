import {  BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { hash, verify } from 'argon2';
import { PrismaService } from '../prisma/prisma.service'
import { SignInDto, SignUpAdminDto, SignUpDto, TokenDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwt: JwtService, private config: ConfigService) { }

  async signupAdmin(dto: SignUpAdminDto): Promise<TokenDto> {
    const passwordsMatch = dto.password === dto.confirmPassword
    if (!passwordsMatch) throw new BadRequestException('password and confirmPassword must match') 

    const hashedPassword = await hash(dto.password)

    try {
      const createdUser = await this.prismaService.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          is_admin: true,
          hased_password: hashedPassword
        }
      })

      const token = await this.signToken(createdUser.id, createdUser.email)

      return { access_token: token }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('credentials already taken')
        }
      }
      throw error
    }
  }


  async signin(dto: SignInDto): Promise<TokenDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email
      }
    })
    if (!user) throw new BadRequestException('Wrong credentials') 

    const passwordMatch = await verify(user.hased_password, dto.password)
    if (!passwordMatch) throw new BadRequestException('Wrong credentials') 

    const token = await this.signToken(user.id, user.email)

    return { access_token: token }
  }

  async signup(dto: SignUpDto): Promise<TokenDto> {
    const passwordsMatch = dto.password === dto.confirmPassword
    if (!passwordsMatch) throw new BadRequestException('password and confirmPassword must match') 

    const hashedPassword = await hash(dto.password)

    try {
      const createdUser = await this.prismaService.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          hased_password: hashedPassword
        }
      })

      const token = await this.signToken(createdUser.id, createdUser.email)

      return { access_token: token }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('credentials already taken')
        }
      }
      throw error
    }
  }

  signToken(userId: number, email: string): Promise<string> {
    const payload = { sub: userId, email }

    return this.jwt.signAsync(payload, {
      expiresIn: '1y',
      secret: this.config.get('JWT_SECRET')
    })
  }
}
