export class PromotionModel {
  id!: string;
  code!: string;
  name!: string;
  description?: string;
  discountType!: string;
  discountValue!: number;
  startDate!: Date;
  endDate!: Date;
  usageLimit?: number;
  minOrderAmount?: number;
}
