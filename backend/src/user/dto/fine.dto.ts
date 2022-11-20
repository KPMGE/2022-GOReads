import { BookBorrowing } from "@prisma/client"

export type FineDto = {
  borrowing: BookBorrowing
  price: number
}
