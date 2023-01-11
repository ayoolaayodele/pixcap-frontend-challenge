var EmployeeOrgApp = /** @class */ (function () {
    function EmployeeOrgApp(ceo) {
        this.moveHistory = [];
        this.undoHistory = [];
        this.ceo = ceo;
    }
    EmployeeOrgApp.prototype.moveEmployee = function (employeeA, employeeB) {
        // find employeeA in employeeB's subordinates
        var index = employeeB.subordinates.findIndex(function (subordinate) { return subordinate.uniqueId === employeeA.uniqueId; });
        // remove employeeA from employeeB's subordinates
        if (index !== -1) {
            employeeB.subordinates.splice(index, 1);
        }
        // add employeeA as a subordinate of employeeB
        employeeA.subordinates.push(employeeB);
        // save the move action to move history
        this.moveHistory.push({ employeeA: employeeA, employeeB: employeeB });
        // clear undo history
        this.undoHistory = [];
    };
    EmployeeOrgApp.prototype.undo = function () {
        // get the last move action from move history
        var lastMove = this.moveHistory.pop();
        if (lastMove) {
            // find lastMove.employeeA in lastMove.employeeB's subordinates
            var index = lastMove.employeeB.subordinates.findIndex(function (subordinate) { return subordinate.uniqueId === lastMove.employeeA.uniqueId; });
            // remove lastMove.employeeA from lastMove.employeeB's subordinates
            lastMove.employeeB.subordinates.splice(index, 1);
            // add lastMove.employeeA as a subordinate of lastMove.employeeA.subordinates[0]
            lastMove.employeeA.subordinates[0].subordinates.push(lastMove.employeeA);
            // save the undo action to undo history
            this.undoHistory.push(lastMove);
        }
    };
    return EmployeeOrgApp;
}());
