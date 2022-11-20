import { Module } from '@nestjs/common';
import { BookBorrowingService } from './book-borrowing.service';
import { BookBorrowingController } from './book-borrowing.controller';

@Module({
  controllers: [BookBorrowingController],
  providers: [BookBorrowingService],
  exports: [BookBorrowingService]
})
export class BookBorrowingModule {}
