const names: Array<string> = ['Gui', 'Rich'];

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('That was a Promise');
  }, 200);
});

promise.then((data) => data.split(' '));

const merge = <T extends object, U extends object>(objectA: T, objectB: U) => {
  // generic type 👉 T lock IN the type
  return Object.assign(objectA, objectB);
};

const mergedObjects = merge(
  { name: 'Gui', hobbies: ['Bike'] },
  { age: 33, stuffs: ['computer'] }
);

console.log(mergedObjects);

interface Lengthy {
  length: number;
}

const countAndPrint = <T extends Lengthy>(element: T): [T, string] => {
  let descriptionText: string = 'Got no Value.';

  if (element.length === 1) {
    descriptionText = 'Got 1 element';
  } else if (element.length > 0) {
    descriptionText = 'Got ' + element.length + ' elements';
  }

  return [element, descriptionText];
};

console.log(countAndPrint(['Hello', 'World!']));

const extractAndConvert = <T extends object, U extends keyof T>(
  objectElement: T,
  key: U
) => {
  console.log(objectElement[key]);
  return 'value: ' + objectElement[key];
};

console.log(extractAndConvert({ name: 'Gui' }, 'name'));

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) return;
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Gui');
textStorage.addItem('Rich');
textStorage.removeItem('Gui');

console.log('textStorage: ', textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objectStorage = new DataStorage<object>();
// objectStorage.addItem({ name: 'Sarah' });
// objectStorage.addItem({ name: 'Kevin' });
// objectStorage.removeItem({ name: 'Sarah' });

// console.log('objectStorage: ', objectStorage.getItems());

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

const createGourseGoal = (
  title: string,
  description: string,
  date: Date
): CourseGoal => {
  let courseGoal: Partial<CourseGoal> = {};

  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;

  return courseGoal as CourseGoal;
};

const anotherNames: Readonly<string[]> = ['Gui', 'Rich'];
// Readonly previous type make impossible to edit in any way this array
// 👇
names.push('Sarah') || names.pop();

console.log(anotherNames);
