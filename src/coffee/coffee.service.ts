import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Like, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { throwError } from 'rxjs';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly CoffeRepository: Repository<Coffee>,
  ) {}
  createMenu(createCoffeeDto: CreateCoffeeDto) {
    const { Menu, Rating, Category, Reviewer, Description, Price, imgUrl } =
      createCoffeeDto;
    const coffee = new Coffee();
    coffee.id = uuidv4();
    coffee.Menu = Menu;
    coffee.Rating = Rating;
    coffee.Category = Category;
    coffee.Price = Price;
    coffee.Reviewer = Reviewer;
    coffee.Description = Description;
    coffee.imgUrl = imgUrl;

    // const env = process.env.DATABASE_PASSWORD;
    // return env;

    return this.CoffeRepository.save(coffee);
  }

  async getAllMenu(): Promise<Coffee[]> {
    const menu = await this.CoffeRepository.find();
    if (!menu.length) throw new NotFoundException('Menu Kosong');
    return menu;
  }

  async getByName(coffeeName: string): Promise<object | string> {
    const coffee = await this.CoffeRepository.find({
      where: {
        Menu: Like(`%${coffeeName}%`),
      },
    });

    return {
      coffee,
    };
  }

  async getByCategory(category: string): Promise<Coffee[]> {
    const coffee = await this.CoffeRepository.find({
      where: {
        Category: category,
      },
    });
    if (!coffee.length)
      throw new NotFoundException(
        `Tidak ada Coffe dengan Category ${category}`,
      );

    return coffee;
  }
}
