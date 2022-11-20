import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) { }

  async create({ title, author, description }: CreateBookDto): Promise<Book> {
    try {
      const createdBook = await this.prismaService.book.create({
        data: {
          title,
          author,
          description
        }
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

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
