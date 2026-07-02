import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true }) // Otomatis mengurus createdAt dan updatedAt (auto)
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 0 }) // Validasi harga wajib diisi dan minimal 0
  price: number;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop({ default: 0 }) // Default value 0 jika tidak diisi
  stock: number;

  @Prop({ default: true }) // Default value true jika tidak diisi
  isAvailable: boolean;
}

export class ProductSchema {}
export const ProductSchemaFactory = SchemaFactory.createForClass(Product);
