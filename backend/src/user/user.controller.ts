import { Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  getMe(@GetUser() user: User) {
    return this.userService.getMe(user.id)
  }

  @Get('/myBorrowings')
  getMyBorrowings(@GetUser() user: User) {
    return this.userService.getMyBorrowings(user.id)
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get('/calculateFines')
  calculateFines(@GetUser() user: User) {
    return this.userService.calculateFines(user.id)
  }

  @Post('/borrowBook/:bookId')
  @HttpCode(HttpStatus.OK)
  borrowBook(@GetUser() user: User, @Param('bookId') bookId: number) {
    return this.userService.borrowBook(user, +bookId)
  }
}
