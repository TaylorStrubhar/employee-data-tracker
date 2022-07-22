const employeeData = require('./employeeData');
const cTable = require('console.table');
const inquirer = require('inquirer');

const empData = new employeeData();

const promptUser = (questions) => {
    return inquirer.prompt(questions);
};

const addEmp = async () => {
    try {
        const [roles, employees] = await Promise.all([empData.getRoles(), empData.getEmps()]);

        const newEmp = await promptUser([
            {
                type: 'input',
                message: "Please enter the employee's first name:",
                name: 'empFirst'
            },
            {
                type: 'input',
                message: "Please enter the employee's last name:",
                name: 'empLast'
            },
            {
                name: "empRole",
                type: "list",
                choices: function() {
                    const choiceArray = [];
                    roles.forEach((role) => {
                        const roleObj = {
                            name: role.title,
                            value: role.id
                        }
                        choiceArray.push(roleObj)
                    })
                    return choiceArray;
                },
                message: "Please choose this employee's role:"
            },
            {
                name: "empMngr",
                type: "list",
                choices: function () {
                    const choiceArray = [{ name: "None", value: -1 }];
                    employees.forEach((employee) => {
                        const mngrObj = {
                            name: employee.first_name + " " + employee.last_name,
                            value: employee.id
                        }
                        choiceArray.push(mngrObj);
                    })
                    return choiceArray;
                },
                message: "Please choose this employee's manager:"
            },

        ]);

        await empData.createEmp(newEmp);
        console.log(`\n${newEmp.empFirst} ${newEmp.empLast} has been added.`);

    } catch (err) {
        console.log(err);
    }
}

const addDept = async () => {
    try {
        const newDept = await promptUser([
            {
                type: 'input',
                message: "Please enter the name of the new department:",
                name: 'deptName'
            },
        ]);

        await empData.createDept(newDept);
        console.log(`The ${newDept.deptName} department has been added.`);

    } catch (err) {
        console.log(err);
    }
}

const addRole = async () => {
    try {
        const departments = await empData.getDepts();

        const newRole = await promptUser([
            {
                type: 'input',
                message: "Please enter the title of the new role:",
                name: 'roleTitle'
            },
            {
                type: 'input',
                message: "Please enter the salary for this role:",
                name: 'roleSalary',
                validate: function (salary) {
                    const valid = /\d+/.test(salary)
                    if (valid) {
                        return true;
                    } else {
                        return "Please enter a valid number for salary.";
                    }
                }
            },
            {
                name: "roleDept",
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
                message: "Please enter the department this role belongs to:"
            },

        ]);

        await empData.createRole(newRole);
        console.log(`The ${newRole.roleTitle} role has been added.`);

    } catch (err) {
        console.log(err);
    }

}

module.exports = { addEmp, addDept, addRole }