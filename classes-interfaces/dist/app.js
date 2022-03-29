"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    static createEmployee(name) {
        return { name: name };
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
Department.fiscalYear = 2022;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
        this.admins = admins;
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
        this.lastReport = reports[0];
    }
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No report Found !");
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error("Please pass in Valid Value !");
        }
        this.addReport(value);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    addEmployee(name) {
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
//# sourceMappingURL=app.js.map