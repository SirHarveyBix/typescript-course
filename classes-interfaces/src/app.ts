class Department {
  // public is default
  // private name: string;
  private employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    // this.name = name;
  }

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformations() {
    console.log("length: ", this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department("D1", "Accounting");
accounting.addEmployee("Max");
accounting.addEmployee("Gui");

// accounting.employees[2] = "Marie"; // private => needs to use class method: 'addEmployee("Marie")'

accounting.describe();
accounting.printEmployeeInformations();

// const accountingCopy = { name: "Dummy Class", describe: accounting.describe };

// accountingCopy.describe();
