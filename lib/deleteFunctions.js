const employeeData = require('./employeeData');
const cTable = require('console.table');
const inquirer = require('inquirer');


const empData = new employeeData();

const promptUser = (questions) => {
    return inquirer.prompt(questions);
};

const delEmp = async () => {
    try {
        const employees = await empData.getEmployees()
        const deleteEmp = await promptUser([
            {
                name:"empId",
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
                message: "Which employee is to be removed?"
            },
        ]);

        const [directReports, empToRemove] = await Promise.all([empData.getEmpsWithMngr(deleteEmp.empId), empData.getEmpById(deleteEmp.empId)])
        const confirm = await promptUser([
            {
                name: "yN",
                type: "confirm",
                default: false,
                message: `\nAre you sure you want to remove ${empToRemove[0].first_name} ${empToRemove[0].last_name}? This action cannot be undone once committed.`
            }
        ]);
        if (confirm.yN) {
            directReports.forEach(async (emp) => {
                try {
                    await empData.updateEmpMngr(null, emp.id)
                } catch (err) {
                    console.log(err)
                }
            })

            await empData.remove("employee", deleteEmp.empId)
            console.log(`\n${empToRemove[0].first_name} ${empToRemove[0].last_name} has been removed from the system.`)
        }
    } catch (err) {
        console.log(err)
    }
}

const delDept = async () => {
    try {
        const departments = await empData.getDepts();
        const remove = await promptUser([

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
                message: "Which department would you like to remove?"
            },

        ]);

        const deptRoles = await empData.getRolesByDept(remove.deptId);
        if (deptRoles.length) {
            console.log("\n------------------------\n")
            console.log("WARNING: This department contains the following roles in use:")
            deptRoles.forEach((role) => {
                console.log(role.title)
            })
            console.log("If you remove this department, all roles and employees in this department WILL ALSO BE REMOVED!")
            console.log("\n------------------------\n")
        }
        const removeDept = await empData.getDeptById(remove.deptId);
        const confirm = await promptUser([
            {
                name: "yN",
                type: "confirm",
                default: false,
                message: `\nAre you sure you want to remove ${removeDept[0].department}? This action cannot be undone once committed.`
            }
        ]);
        if (confirm.yN) {
            await empData.remove("department", remove.deptId)
            console.log(`\nThe ${removeDept[0].department} department has been removed.`)

        }

    } catch (err) {
        console.log(err)
    }
}

const delRole = async () => {
    try {
        const roles = await empData.getRoles();
        const remove = await promptUser([

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
                message: "Which role would you like to remove?"
            },

        ]);

        const roleEmps = await empData.getEmpsByRole(remove.roleId);
        if (roleEmps.length) {
            console.log("\n------------------------\n")
            console.log("WARNING: This role is assigned to the following active employees:")
            roleEmps.forEach((emp) => {
                console.log(`${emp.first_name} ${emp.last_name}`)
            })
            console.log("If you remove this role, all employees assigned this role WILL ALSO BE REMOVED!")
            console.log("\n------------------------\n")
        }

        const removeRole = await empData.getRoleById(remove.roleId);
        const confirm = await promptUser([
            {
                name: "yN",
                type: "confirm",
                default: false,
                message: `\nAre you sure you want to remove ${removeRole[0].title}? This action cannot be undone once committed.`
            }
        ]);
        
        if (confirm.yN) {
            await empData.remove("role", remove.roleId)
            console.log(`\n${removeRole[0].title} role has been removed.`)

        }

    } catch (err) {
        console.log(err)
    }
}



module.exports = { delDept, delEmp, delRole }