import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  // 1. POST /products (Create)
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  // 2. GET /products (Read All)
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // 3. GET /products/search?q=keyword (Search fitur tambahan)
  async search(keyword: string): Promise<Product[]> {
    return this.productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: 'i' } }, // Case-insensitive search pada nama
          { description: { $regex: keyword, $options: 'i' } }, // Case-insensitive search pada deskripsi
        ],
      })
      .exec();
  }

  // 4. GET /products/:id (Read by ID)
  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // 5. PUT /products/:id (Update)
  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true }) // { new: true } mengembalikan data terbaru setelah update
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  // 6. DELETE /products/:id (Delete)
  async delete(id: string): Promise<{ message: string }> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { message: `Product with ID ${id} successfully deleted` };
  }
}
