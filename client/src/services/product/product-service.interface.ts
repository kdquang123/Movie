import { Observable } from 'rxjs';
import { ProductModel } from '../../models/product/product.model';
import { PaginatedResult } from '../../models/paginated-result.model';

export interface IProductService {
  getAllProduct(): Observable<ProductModel[]>;
  getProductById(id: string): Observable<ProductModel>;
  createProduct(productCreateModel: any): Observable<boolean>;
  updateProduct(id: string, productUpdateModel: any): Observable<boolean>;
  deleteProduct(id: string): Observable<boolean>;
  searchProduct(filter: any): Observable<PaginatedResult<ProductModel>>;
}
