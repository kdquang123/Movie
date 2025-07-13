import { AgeRestrictionModel } from '../age-restriction/age-restriction.model';
import { CategoryModel } from '../category/category.model';

export class MovieModel {
  id!: string;
  name!: string;
  description!: string;
  director!: string;
  actors?: string;
  duration!: number;
  releaseDate!: Date;
  endDate!: Date;
  status?: string;
  imageUrl!: string;
  trailerUrl?: string;
  imDbScore!: number;
  ageRestrictionId!: string;
  ageRestriction?: AgeRestrictionModel;
  categories!: CategoryModel[];
}
