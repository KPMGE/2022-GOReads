import { Injectable, UseGuards } from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import dps from 'dbpedia-sparql-client';
import { JwtGuard } from 'src/auth/guard';

export type DbpediaBook = {
  description: string
  author: string
}

UseGuards(JwtGuard)
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

  async searchBook(searchItem: string): Promise<Book[]> {
    return await this.prismaService.book.findMany({
      where: {
        OR: [
          { author: { contains: searchItem } },
          { title: { contains: searchItem } },
        ]
      }
    })
  }

  async fetchBookFromDbpedia(bookTitle: string): Promise<DbpediaBook> {
    const query = `
      PREFIX dbo: <http://dbpedia.org/ontology/>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

      SELECT * WHERE {
      ?book a dbo:Book .
      ?book dbo:author ?author .
      ?book rdfs:label ?title.

      # get the English title
      ?book rdfs:label ?name.
      FILTER(LANGMATCHES(LANG(?name), 'en'))

      # get an English description, but not the text
      ?book rdfs:comment ?description .
      FILTER(LANGMATCHES(LANG(?description), 'en'))

      # filter for books whose title contains 'bookTitle'
      FILTER regex(str(?title) , "${bookTitle}", "i") .
      } LIMIT 1
    `
    const response = await dps.client().query(query).timeout(15000).asJson()
    const result = response.results.bindings[0]
    if (!result) {
      return { description: '', author: '' }
    }

    const description = result.description.value
    const authorUri = result.author.value
    const words = authorUri.split('/')
    const author = words[words.length - 1]

    return { description, author }
  }
}
