import { Category } from "./category";


export interface  Product {
  id: number;
  name: string;
  category: Category;
  unitPrice: number;
  imported: boolean;
  taxExempt: boolean;
  selected?: boolean;
}



