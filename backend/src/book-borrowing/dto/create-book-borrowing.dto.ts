import {  IsDateString, IsNotEmpty, IsNumber } from "class-validator"

export class CreateBookBorrowingDto {
  @IsNotEmpty()
  @IsDateString()
  borrowingDate: Date

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
