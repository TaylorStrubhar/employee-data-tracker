const employeeData = require('./lib/employeeData');
const connection = require('./lib/dbConnection');
const view = require('./lib/viewFunctions');
const add = require('./lib/addFunctions');
const del = require('./lib/deleteFunctions');
const update = require('./lib/updateFunctions');
const cTable = require('console.table');
const figlet = require('figlet');
const inquirer = require('inquirer');
const { start } = require('repl');

const promptUser = (questions) => {
    return inquirer.prompt(questions);
};

const appExit = ()=> {
    console.log('Thank you, goodbye.');
    connection.end();
    process.exit();
};

const userActionFunctions = {
    'View All Employees': view.viewEmps,
    'View All Employees by Department': view.viewEmpsByDept,
    'View All Employees by Manager': view.viewEmpsByMngr,
    'Add Employee': add.addEmp,
    'Remove Employee': del.delEmp,
    'Update Employee Role': update.updateEmpRole,
    'Update Employee Manager': update.updateEmpMngr,
    'View All Roles': view.viewRoles,
    'Add Role': add.addRole,
    'Remove Role': del.delRole,
    'View All Departments': view.viewDepts,
    'View Budget by Department': view.viewBudgetByDept,
    'Add Department': add.addDept,
    'Remove Department': del.delDept,
    'Exit Application': appExit
}

const choices = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'task',
        choices: [
            'View All Employees',
            'View All Employees by Department',
            'View All Employees by Manager',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'Update Employee Manager',
            'View All Roles',
            'Add Role',
            'Remove Role',
            'View All Departments',
            'View Budget by Department',
            'Add Department',
            'Remove Department',
            'Exit Application'
        ]
    }
];

const init = async () => {
    try {
        console.log("\n--------\n")
        const choicesSelection = await promptUser(choices);
        console.log("\n--------\n")
        await userActionFunctions[choicesSelection.task]();
        init();
    } catch (err) {
        console.log(err);
    }
};

const start = () => {
    figlet('     E   D   T', {
        font:'Big'
    }, (err, data) => {
        if (err) {
            console.log(err)
        }
        console.log("\n")
        console.log(data);
        console.log("       ****************************************")
        console.log("\n                    Welcome to our \n             Employee Data Tracker")
        console.log("\n       ****************************************")
        init();
    })

}

start();