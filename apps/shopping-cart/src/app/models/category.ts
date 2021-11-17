export class Category {
  name: string;
  taxExempt: boolean;

  constructor(name: string, taxExempt: boolean = false) {
    this.name = name;
    this.taxExempt = taxExempt;
  }
}
