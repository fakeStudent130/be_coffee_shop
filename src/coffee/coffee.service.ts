import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
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
    const { menu, rating, category, reviewer, description, price, imgUrl } =
      createCoffeeDto;

    // const coffee = this.CoffeRepository.create({
    //   id: uuidv4(),
    //   menu: menu,
    //   rating: rating,
    //   category: category,
    //   reviewer: reviewer,
    //   description: description,
    //   label: `${category} ${menu} `,
    //   price: price,
    //   imgUrl: imgUrl,
    // });

    // return this.CoffeRepository.save(coffee);
  }

  async getAllMenu(): Promise<Coffee[] | object> {
    const menu = await this.CoffeRepository.find();
    if (!menu.length) throw new NotFoundException('Menu Kosong');
    return {
      message: HttpStatus.OK,
      data: menu,
    };
  }

  async getByName(coffeeName: string): Promise<object | string> {
    const coffee = await this.CoffeRepository.find({
      where: {
        Menu: Like(`%${coffeeName}%`),
      },
    });

    return {
      message: HttpStatus.OK,
      data: coffee,
    };
  }

  async getByCategory(category: string): Promise<object> {
    const coffee = await this.CoffeRepository.find({
      where: {
        Category: category,
      },
    });
    if (!coffee.length)
      throw new NotFoundException(
        `Tidak ada Coffe dengan Category ${category}`,
      );

    return {
      message: HttpStatus.OK,
      data: coffee,
    };
  }
}
