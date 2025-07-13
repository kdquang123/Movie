import { ProductModel } from '../product/product.model';

export class BookingDetailModel {
  product!: ProductModel;
  quantity: number = 0;
}
