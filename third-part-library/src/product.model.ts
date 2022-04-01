import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class Product {
  @IsNotEmpty() title: string;
  @IsNumber() @IsPositive() price: number;

  constructor(t: string, p: number) {
    this.price = p;
    this.title = t;
  }

  getInformations() {
    return [this.title, `${this.price} €`];
  }
}
