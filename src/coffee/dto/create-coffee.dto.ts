import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsNotEmpty()
  @IsString()
  Menu: string;

  @IsNotEmpty()
  @IsNumber()
  Rating: number;

  @IsNotEmpty()
  @IsString()
  Category: string;

  @IsNotEmpty()
  @IsString()
  Reviewer: string;

  @IsNotEmpty()
  @IsString()
  Description: string;

  @IsNotEmpty()
  @IsNumber()
  Price: number;

  @IsNotEmpty()
  @IsString()
  imgUrl: string;
}
