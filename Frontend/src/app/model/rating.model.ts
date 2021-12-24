import { Product } from './product.model';
import { User } from './user.model';

export interface Rating {
  id: number;
  rate: number;
  message: string;
  user: User;
  book: Product;
}
