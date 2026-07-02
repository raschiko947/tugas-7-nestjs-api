import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';

@Controller('products') // Base route: /products
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // 1. POST /products
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    // Validasi Bad Request (400)
    if (!createProductDto.name || createProductDto.price === undefined) {
      throw new BadRequestException('Name and price are required');
    }
    return this.productsService.create(createProductDto);
  }

  // 2. GET /products
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  // 3. GET /products/search?q=keyword (Fitur tambahan pencarian)
  @Get('search')
  async search(@Query('q') q: string): Promise<Product[]> {
    if (!q) {
      return this.productsService.findAll();
    }
    return this.productsService.search(q);
  }

  // 4. GET /products/:id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  // 5. PUT /products/:id
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  // 6. DELETE /products/:id
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.productsService.delete(id);
  }
}
