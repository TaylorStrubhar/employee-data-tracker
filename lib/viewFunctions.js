const employeeData = require('./employeeData');
const cTable = require('console.table');
const inquirer = require('inquirer');

const empData = new employeeData();

const promptUser = (questions) => {
    return inquirer.prompt(questions);
};

const viewEmps = async () => {
    try {
        const rows = await empData.getEmps()
        console.table(rows);
    } catch (err) {
        console.log(err);
    }
}

const viewRoles = async () => {
    try {
        const rows = await empData.getRoles()
        console.table(rows);
    } catch (err) {
        console.log(err)
    }
}

const viewDepts = async () => {
    try {
        const rows = await empData.getDepts()
        console.table(rows);
    } catch (err) {
        console.log(err)
    }
}

const viewEmpsByDept = async () => {
    try {
        const departments = await empData.getDepts();
        const chosenDept = await promptUser([
            {
                name: "deptId",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    departments.forEach((dept) => {
                        const deptObj = {
                            name: dept.department,
                            value: dept.id
                        }
                        choiceArray.push(deptObj)
                    })
                    return choiceArray;
                },
                message: "Which department's employees would you like to view'?"
            },

        ]);

        const rows = await empData.getEmpsByDept(chosenDept.deptId);
        console.log("\n")
        console.table(rows);

    } catch (err) {
        console.log(err)
    }
}

const viewEmpsByMngr = async () => {
    try {
        const employees = await empData.getEmps();
        const chosenMngr = await promptUser([
            {
                name: "mngrId",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    employees.forEach((emp) => {
                        const mngrObj = {
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: emp.id
                        }
                        choiceArray.push(mngrObj)
                    })
                    return choiceArray;
                },
                message: "Which manager's employees would you like to view'?"
            },

        ]);

        const rows = await empData.getEmpsByMngr(chosenMngr.mngrId);
        if (!rows.length) {
            console.log("This manager has no employees.");
        } else {
            console.log("\n------------------------\n")
            console.table(rows);

        }

    } catch (err) {
        console.log(err)
    }
}

const viewBudgetByDept = async () => {
    try {
        const departments = await empData.getDepts();
        const chosenDept = await promptUser([
            {
                name: "deptId",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    departments.forEach((dept) => {
                        const deptObj = {
                            name: dept.department,
                            value: dept.id
                        }
                        choiceArray.push(deptObj)
                    })
                    return choiceArray;
                },
                message: "Which department's budget would you like to view'?"
            },
        ]);

        const rows = await empData.getBudgetByDept(chosenDept.deptId);
        if (rows.length) {
            console.log("\n")
            console.table(rows);

        } else {
            console.log("\n------------------------\n")
            console.log("This department currently has no active employees.")
            console.log("\n------------------------\n")
        }

    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewEmps, viewRoles, viewDepts, viewEmpsByDept, viewEmpsByMngr, viewBudgetByDept }