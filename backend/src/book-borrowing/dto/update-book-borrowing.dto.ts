import { PartialType } from '@nestjs/mapped-types';
import { CreateBookBorrowingDto } from './create-book-borrowing.dto';

export class UpdateBookBorrowingDto extends PartialType(CreateBookBorrowingDto) {}
