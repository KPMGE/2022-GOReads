import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateBookBorrowingDto {
  @IsNotEmpty()
  @IsNumber()
  borrowingDuration: number

  @IsNotEmpty()
  @IsNumber()
  finePerDay: number

  @IsNotEmpty()
  @IsNumber()
  bookId: number
}
