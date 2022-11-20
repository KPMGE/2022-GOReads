import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookBorrowingService } from './book-borrowing.service';
import { CreateBookBorrowingDto } from './dto/create-book-borrowing.dto';
import { UpdateBookBorrowingDto } from './dto/update-book-borrowing.dto';

@Controller('book-borrowing')
export class BookBorrowingController {
  constructor(private readonly bookBorrowingService: BookBorrowingService) {}

  @Post()
  create(@Body() createBookBorrowingDto: CreateBookBorrowingDto) {
    return this.bookBorrowingService.create(createBookBorrowingDto);
  }

  @Get()
  findAll() {
    return this.bookBorrowingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookBorrowingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookBorrowingDto: UpdateBookBorrowingDto) {
    return this.bookBorrowingService.update(+id, updateBookBorrowingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookBorrowingService.remove(+id);
  }
}
