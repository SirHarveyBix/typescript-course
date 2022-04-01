import _ from 'lodash';
import { plainToClass } from 'class-transformer';
import 'reflect-metadata';
import { Product } from './product.model';
import { validate } from 'class-validator';

console.log(_.shuffle([1, 2, 3]));

declare var GLOBAL: string;
console.log(GLOBAL);

const products = [
  { title: 'Book', price: 27 },
  { title: 'Carpet', price: 159 },
];

const newProduct = new Product('', -1);
validate(newProduct).then((errors) => {
  if (errors.length > 0) console.log('ERROR :', errors);
  else console.log(newProduct.getInformations());
});
// const loadedProducts = products.map((product) => {
//   return new Product(product.title, product.price);
// });

// for (const product of loadedProducts) {
//   console.log(product.getInformations());
// }

// const p1 = new Product('Book', 15.99);

// console.log(p1.getInformations());

const loadedProducts = plainToClass(Product, products);

console.log('loadedProducts', loadedProducts);
