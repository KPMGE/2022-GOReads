import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) { }

  async create({ title, author, description }: CreateBookDto) {
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

  async findAll() {
    return this.prismaService.book.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
