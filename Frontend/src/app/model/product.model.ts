import { Category } from './category.model';

export interface Product {
  id: number;
  name: string;
  author: string;
  image: string;
  description: string;
  language: string;
  pages: number;
  year: number;
  category: Category;
}
