enum Role {
  ADMIN, // 0
  READ_ONLY, // 1
  AUTHOR, // 2
}

interface Person {
  name: string;
  age: number;
  hobbies: string[];
  role: Role;
  // role: [number, string]; // => type = tuple
}

const person: Person = {
  name: "Guillaume",
  hobbies: ["velo", "manger"],
  age: 33,
  role: Role.ADMIN,
  // role: [2, "dev"],
};

console.log(person.role);
