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

const AutoBind = (
  _target: any,
  _methodName: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;

  const adjDesciptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFunction = originalMethod.bind(this);
      return boundFunction;
    },
  };
  return adjDesciptor;
};

class Printer {
  message = 'This Work !';

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button')!;

button.addEventListener('click', p.showMessage);

// ---

const config: { [input: string]: string[] } = {};

const addValidator = (input: string, type: string) => {
  config[input] = config[input] ? [...config[input], type] : [type];
};

const Required = (_: any, input: string) => addValidator(input, 'required');
const Maxlength = (_: any, input: string) => addValidator(input, 'maxlength');
const Positive = (_: any, input: string) => addValidator(input, 'positive');

const validate = (anyObject: any) => {
  return Object.entries(config).every(([input, types]) => {
    return types.every(
      (type) =>
        (type === 'required' && anyObject[input]) ||
        (type === 'maxlength' && anyObject[input] > 0) ||
        (type === 'positive' && anyObject[input].lenght < 5)
    );
  });
};
class Course {
  @Required title: string;

  @Positive price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;

courseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleElement = document.getElementById('title') as HTMLInputElement;
  const priceElement = document.getElementById('price') as HTMLInputElement;

  const title = titleElement.value;
  const price = Number(priceElement.value);

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    throw new Error('invalid input');
    return;
  }
  console.log(createdCourse);
});
