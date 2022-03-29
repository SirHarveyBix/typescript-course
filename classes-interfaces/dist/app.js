"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    describe() {
        console.log(`Department (${this.id}): ${this.name}`);
    }
    addEmployee(employee) {
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
accounting.describe();
accounting.printEmployeeInformations();
//# sourceMappingURL=app.js.map