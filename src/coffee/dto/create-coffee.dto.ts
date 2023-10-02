import { IsNotEmpty } from 'class-validator';

export class CreateCoffeeDto {
  @IsNotEmpty()
  Menu: string;

  @IsNotEmpty()
  Rating: string;

  @IsNotEmpty()
  Category: string;

  @IsNotEmpty()
  Reviewer: string;

  @IsNotEmpty()
  Description: string;

  @IsNotEmpty()
  Price: string;

  @IsNotEmpty()
  imgUrl: string;
}
