import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.createMenu(createCoffeeDto);
  }

  @Get()
  GetAllMenu() {
    return this.coffeeService.getAllMenu();
  }

  @Get(':coffeeName')
  GetByCoffeeName(@Param('coffeeName') coffeeName: string) {
    return this.coffeeService.getByName(coffeeName);
  }

  @Get('category/:category')
  GetByCategory(@Param('category') category: string) {
    return this.coffeeService.getByCategory(category);
  }

  @Get('search/:label')
  SearchCoffe(@Param('label') label: string) {
    return this.coffeeService.searchCoffe(label);
  }
}
