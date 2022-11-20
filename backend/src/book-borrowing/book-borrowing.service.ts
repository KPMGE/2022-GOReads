import { Injectable } from '@nestjs/common';
import { CreateBookBorrowingDto } from './dto/create-book-borrowing.dto';
import { UpdateBookBorrowingDto } from './dto/update-book-borrowing.dto';

@Injectable()
export class BookBorrowingService {
  create(createBookBorrowingDto: CreateBookBorrowingDto) {
    return 'This action adds a new bookBorrowing';
  }

  findAll() {
    return `This action returns all bookBorrowing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookBorrowing`;
  }

  update(id: number, updateBookBorrowingDto: UpdateBookBorrowingDto) {
    return `This action updates a #${id} bookBorrowing`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookBorrowing`;
  }
}
