const employeeData = require('./employeeData');
const cTable = require('console.table');
const inquirer = require('inquirer');

const empData = new employeeData();

const promptUser = (questions) => {
    return inquirer.prompt(questions);
};

const updateEmpRole = async () => {
    try {
        const [roles, employees] = await Promise.all([empData.getRoles(), empData.getEmps()])
        const updateEmp = await promptUser([

            {
                name: "empId",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    employees.forEach((emp) => {
                        const empObj = {
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: emp.id
                        }
                        choiceArray.push(empObj)
                    })
                    return choiceArray;
                },
                message: "Which employee's role would you like to change?"
            },

        ]);

        const newRole = await promptUser([
            {
                name: "roleId",
                type: "list",
                choices: function () {
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
                message: "Please choose the employee's new role:"
            },
        ]);

        await empData.updateEmpRole(newRole.roleId, updateEmp.empId)
        console.log("\n")
        console.log("The employee's role has been updated.")

    } catch (err) {
        console.log(err);
    }

}

const updateEmpMngr = async () => {
    try {
        const employees = await empData.getEmps();

        const updateEmp = await promptUser([
            {
                name: "empId",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    employees.forEach((emp) => {
                        const empObj = {
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: emp.id
                        }
                        choiceArray.push(empObj)
                    })
                    return choiceArray;
                },
                message: "Which employee's manager would you like to update?"
            },

        ]);

        const managers = employees.filter((emp) => {
            return emp.id !== updateEmp.empId
        })

        const newMngr = await promptUser([
            {
                name: "mngrId",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    managers.forEach((mngr) => {
                        const mngrObj = {
                            name: `${mngr.first_name} ${mngr.last_name}`,
                            value: mngr.id
                        }
                        choiceArray.push(mngrObj)
                    })
                    return choiceArray;
                },
                message: "Please choose the employee's new manager:"
            },
        ]);

        await empData.updateEmpMngr(newMngr.mngrId, updateEmp.empId)
        console.log("\n")
        console.log("This employee's manager has been updated.")

    } catch (err) {
        console.log(err);
    }

}

module.exports = { updateEmpRole, updateEmpMngr }