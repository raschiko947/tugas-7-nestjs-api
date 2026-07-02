import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchemaFactory } from './schemas/product.schema';

@Module({
  imports: [
    // Daftarkan model Product ke MongooseModule fitur lokal ini
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchemaFactory },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
