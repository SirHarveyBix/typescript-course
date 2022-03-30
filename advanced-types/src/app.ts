interface Admin {
  name: string;
  privileges: string[] | null;
}

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin {}
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Gui',
  privileges: ['create-server'],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// Function overloads
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
  // type Guard => meant to compile right on runtime
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add('Gui', ' Harvey');
result.split(' ');

const fetchedUserData = {
  id: 'u1',
  name: 'Gui',
  job: { title: 'CEO', description: 'random employee' },
};

// Optional Chaining
console.log(fetchedUserData?.job?.title);

const userInput = '';
// Nullish Coalescing = null or undefined ONLY
const storedData = userInput ?? 'DEFAULT';
console.log(storedData);

type UnknownEmployee = Employee | Admin;

const printEmployeeInformations = (employee: UnknownEmployee) => {
  console.log('Name: ', employee.name);
  // type Guard => meant to compile right on runtime

  if ('privileges' in employee) {
    console.log('Privileges: ', employee.privileges);
  }
  if ('startDate' in employee) {
    console.log('startDate: ', employee.startDate);
  }
};

printEmployeeInformations(e1);

class Car {
  drive() {
    console.log('Driving car');
  }
}

class Truck {
  drive() {
    console.log('Driving truck');
  }
  loadCargo(amount: number) {
    console.log('Loading Cargo:', amount, 'Kg');
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

const useVehicle = (vehicle: Vehicle) => {
  vehicle.drive();
  // type Guard
  if (vehicle instanceof Truck) vehicle.loadCargo(1000);
};

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

const moveAnimal = (animal: Animal) => {
  // Discriminated Unions
  let speed: number;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
  }
  console.log('Moving at speed :', speed);
};

moveAnimal({ type: 'bird', flyingSpeed: 10 });

// const userInputElement = <HTMLInputElement>document.getElementById('user-input');
const userInputElement = document.getElementById(
  'user-input'
  //type casting
)! as HTMLInputElement;
// ! > means it'll never return null

(userInputElement as HTMLInputElement).value = 'Hello World!';

interface ErrorContainer {
  // index type
  [key: string]: string;
  // i don know how many key i'll get from the object, i know it's gonna be string values
}

const errorBag: ErrorContainer = {
  email: 'Not valid',
  1: 'Not an email',
  'this either work': 'unfortunatelly',
  username: 'must be in camelCase !',
};
