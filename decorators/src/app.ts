// tsconfig : "experimentalDecorators": true
const Logger = (logString: string) => {
  console.log('LOGGER FACTORY');

  return (constructor: Function) => {
    console.log('Logger - logString: ', logString);
    console.log('Logger - constructor: ', constructor);
  };
};

const WithTemplate = (template: string, hookId: string) => {
  console.log('TEMPLATE FACTORY');
  return <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) => {
    return class extends originalConstructor {
      constructor(..._args: any[]) {
        super();
        console.log('Rendering Template');

        const hookElement = document.getElementById(hookId);
        if (hookElement) {
          hookElement.innerHTML = template;
          hookElement.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
};

@Logger('LOGGING')
@WithTemplate('<h1>My Person Object</h1>', 'app') // it renders first !
class Person {
  name = 'Gui';

  constructor() {
    console.log('Creating Pertson Object ...');
  }
}

const pers = new Person();
console.log(pers);

// ---

const Log = (target: any, propertyName: string) => {
  console.log('Property Decorator');
  console.log('target 1', target, 'propertyName 1', propertyName);
};

const Log2 = (
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) => {
  console.log('Accessor Decorator');
  console.log('target 2 ', target);
  console.log('name 2 ', name);
  console.log('descriptor 2 ', descriptor);
};

const Log3 = (
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) => {
  console.log('Method Decorator');
  console.log('target 3 ', target);
  console.log('name 3 ', name);
  console.log('descriptor 3 ', descriptor);
};

const Log4 = (target: any, name: string | Symbol, position: number) => {
  console.log('Parameter Decorator');
  console.log('target 4 ', target);
  console.log('name 4 ', name);
  console.log('descriptor 4 ', position);
};

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) this._price = val;
    else throw Error('invalid price');
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}
