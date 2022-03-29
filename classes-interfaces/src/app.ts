class Department {
  static fiscalYear = 2022;
  // private readonly id: string;
  // private name: string;
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    // this.id = id;
    // this.name = name;
    // console.log(Department.fiscalYear)
  }

  static createEmployee(name: string) {
    return { name: name };
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

class ITDepartment extends Department {
  // admins: string[];
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report Found !");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in Valid Value !");
    }
    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }
  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  addEmployee(name: string) {
    if (name === "Gui") {
      return;
    }
    this.employees.push(name);
  }

  printReports() {
    console.log("printReports", this.reports);
  }
}

const employee1 = Department.createEmployee("Fred");

const it = new ITDepartment("D1", ["Gui"]);

it.addEmployee("Max");
it.addEmployee("Gui");

it.describe();
it.printEmployeeInformations();
console.log("it", it);

const accounting = new AccountingDepartment("d1", []);

accounting.mostRecentReport = "Year end report";
accounting.addReport("Something went wrong .. ");
console.log(accounting.mostRecentReport);

accounting.addEmployee("Gui");
accounting.addEmployee("Kevin");

accounting.printEmployeeInformations();

accounting.printReports();
