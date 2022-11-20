import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookBorrowing, User } from '@prisma/client';
import { BookBorrowingService } from 'src/book-borrowing/book-borrowing.service';
import { BooksService } from 'src/books/books.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FineDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bookService: BooksService,
    private readonly bookBorrowingService: BookBorrowingService,
    private readonly config: ConfigService
  ) { }

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany()
  }

  async borrowBook(user: User, bookId: number) {
    const foundBook = await this.bookService.findOne(bookId)
    if (!foundBook) throw new NotFoundException('book not found')
    const fines = await this.calculateFines(user.id)

    if (fines.length > 0) throw new ForbiddenException("you can't borrow a book because you got pending fines. Please, pay them first")

    await this.bookBorrowingService.create(user.id, {
      bookId: foundBook.id,
      borrowingDuration: this.config.get('BORROWING_DURATION_IN_DAYS') || 15,
      finePerDay: this.config.get('FINE_PER_DAY') || 1,
    })
  }

  async calculateFines(userId: number): Promise<FineDto[]> {
    const foundBookBorrowings = await this.prismaService.bookBorrowing.findMany({
      where: {
        user_id: userId
      }
    })

    if (!foundBookBorrowings) return []

    const fines = this.calculateFineAndPrices(foundBookBorrowings)
    return fines
  }

  calculateFineAndPrices(borrowings: BookBorrowing[]): FineDto[] {
    const expiredBorrowigs = borrowings.filter(borrowing => {
      const borrowingDuration = borrowing.borrowing_duration
      const borrowingDate = borrowing.created_at
      const today = new Date()
      const daysBorrowed = this.getNumberOfDays(borrowingDate, today)
      const diffDays = daysBorrowed - borrowingDuration

      if (diffDays > 0) {
        return borrowing
      }
    })

    let fines: FineDto[] = []
    for (let borrowing of expiredBorrowigs) {
      const today = new Date()
      const finePerDay = borrowing.fine_per_day
      const borrowingDate = borrowing.created_at
      const borrowingDuration = borrowing.borrowing_duration
      const daysBorrowed = this.getNumberOfDays(borrowingDate, today)
      const diffDays = daysBorrowed - borrowingDuration
      const price = diffDays * finePerDay

      fines.push({ borrowing: borrowing, price })
    }

    return fines
  }

  getNumberOfDays(start: Date, end: Date) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  }
}
