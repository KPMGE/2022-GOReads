import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { BooksModule } from './books/books.module';
import { BookBorrowingModule } from './book-borrowing/book-borrowing.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    BooksModule,
    BookBorrowingModule,
    UserModule
  ],
  providers: [PrismaService, UserService],
  controllers: [UserController],
})
export class AppModule {}
