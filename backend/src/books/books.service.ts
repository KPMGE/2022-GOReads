import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(dto: CreateBookDto): Promise<Book> {
    try {
      const createdBook = await this.prismaService.book.create({
        data: { ...dto }
      })

      return createdBook
    } catch (error) {
      throw error
    }
  }

  async findAll(): Promise<Book[]> {
    return await this.prismaService.book.findMany()
  }

  async findOne(id: number): Promise<Book> {
    return await this.prismaService.book.findUnique({ where: { id } })
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    return await this.prismaService.book.update({
      where: { id },
      data: { ...updateBookDto }
    })
  }

  async remove(id: number): Promise<Book> {
    return await this.prismaService.book.delete({
      where: { id }
    })
  }
}
