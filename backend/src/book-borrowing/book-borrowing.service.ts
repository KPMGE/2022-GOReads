import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookBorrowingDto } from './dto/create-book-borrowing.dto';
import { UpdateBookBorrowingDto } from './dto/update-book-borrowing.dto';

@Injectable()
export class BookBorrowingService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, dto: CreateBookBorrowingDto) {
    const foundBook = await this.prismaService.book.findUnique({ where: { id: dto.bookId } })
    if (!foundBook) throw new NotFoundException('there is no book for the given id')

    return await this.prismaService.bookBorrowing.create({
      data: { 
        fine_per_day: dto.finePerDay,
        borrowing_duration: dto.borrowingDuration,
        book: { 
          connect: { id: dto.bookId }
        },
        user: {
          connect: { id: userId }
        }
      }
    })
  }

  async findAll() {
    return await this.prismaService.bookBorrowing.findMany()
  }

  async findOne(id: number) {
    return await this.prismaService.bookBorrowing.findUnique({ where: { id } })
  }

  async update(id: number, dto: UpdateBookBorrowingDto) {
    return await this.prismaService.bookBorrowing.update({
      where: { id },
      data: { 
        borrowing_duration: dto.borrowingDuration,
        fine_per_day: dto.finePerDay,
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} bookBorrowing`;
  }
}
