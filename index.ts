interface Employee {
  uniqueId: number;
  name: string;
  subordinates: Employee[];
}

interface IEmployeeOrgApp {
  moveEmployee(employeeA: Employee, employeeB: Employee): void;
  undo(): void;
}

class EmployeeOrgApp implements IEmployeeOrgApp {
  private ceo: Employee;
  private moveHistory: Array<{ employeeA: Employee; employeeB: Employee }> = [];
  private undoHistory: Array<{ employeeA: Employee; employeeB: Employee }> = [];

  constructor(ceo: Employee) {
    this.ceo = ceo;
  }

  moveEmployee(employeeA: Employee, employeeB: Employee): void {
    // find employeeA in employeeB's subordinates
    const index = employeeB.subordinates.findIndex(
      (subordinate) => subordinate.uniqueId === employeeA.uniqueId
    );

    // remove employeeA from employeeB's subordinates
    if (index !== -1) {
      employeeB.subordinates.splice(index, 1);
    }

    // add employeeA as a subordinate of employeeB
    employeeA.subordinates.push(employeeB);
    // save the move action to move history
    this.moveHistory.push({ employeeA, employeeB });
    // clear undo history
    this.undoHistory = [];
  }

  undo(): void {
    // get the last move action from move history
    const lastMove = this.moveHistory.pop();
    if (lastMove) {
      // find lastMove.employeeA in lastMove.employeeB's subordinates
      const index = lastMove.employeeB.subordinates.findIndex(
        (subordinate) => subordinate.uniqueId === lastMove.employeeA.uniqueId
      );
      // remove lastMove.employeeA from lastMove.employeeB's subordinates
      lastMove.employeeB.subordinates.splice(index, 1);
      // add lastMove.employeeA as a subordinate of lastMove.employeeA.subordinates[0]
      lastMove.employeeA.subordinates[0].subordinates.push(lastMove.employeeA);
      // save the undo action to undo history
      this.undoHistory.push(lastMove);
    }
  }
}

const employees: Employee[] = [
  { uniqueId: 2, name: "Sarah", subordinates: [] },
  { uniqueId: 3, name: "Tyler", subordinates: [] },
  { uniqueId: 5, name: "Bruce", subordinates: [] },
  { uniqueId: 6, name: "Georgina", subordinates: [] },
];

const ceo: Employee = {
  uniqueId: 1,
  name: "Mark Zuckerberg",
  subordinates: employees,
};

const app = new EmployeeOrgApp(ceo);
console.log(app);
