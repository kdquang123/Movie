import { Injectable } from '@angular/core';
import { IProductService } from './product-service.interface';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../models/paginated-result.model';
import { ProductModel } from '../../models/product/product.model';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements IProductService {
  constructor(private readonly httpClient: HttpClient) {}
  getAllProduct(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(ApiEndpoints.getAllProduct);
  }
  getProductById(id: string): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(
      `${ApiEndpoints.getProductById}/${id}`
    );
  }
  createProduct(productCreateModel: any): Observable<boolean> {
    return this.httpClient.post<boolean>(
      ApiEndpoints.createProduct,
      productCreateModel
    );
  }
  updateProduct(id: string, productUpdateModel: any): Observable<boolean> {
    return this.httpClient.put<boolean>(
      `${ApiEndpoints.updateProduct}/${id}`,
      productUpdateModel
    );
  }
  deleteProduct(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${ApiEndpoints.deleteProduct}/${id}`
    );
  }
  searchProduct(filter: any): Observable<PaginatedResult<ProductModel>> {
    return this.httpClient.post<PaginatedResult<ProductModel>>(
      ApiEndpoints.searchProduct,
      filter
    );
  }
}
