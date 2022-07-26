const connection = require("./dbConnection.js");
const util = require('node:util');

const query = util.promisify(connection.query).bind(connection);

class employeeData {
    constructor(query) {
        this.query = query;
    }

    getEmps() {
        return query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) manager_name FROM ((employee LEFT JOIN employee manager ON manager.id = employee.manager_id) INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id) ORDER BY employee.id');
    }

    getEmpById(id) {
        return query('SELECT * from employee WHERE id = ?', [id]);
    }

    getEmpsByDept(deptId) {
        return query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) manager_name FROM ((employee LEFT JOIN employee manager ON manager.id = employee.manager_id) INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id) WHERE department.id = ? ORDER BY employee.id', [deptId]);
    }

    getEmpsByMngr(mngrId) {
        return query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) manager_name FROM ((employee LEFT JOIN employee manager ON manager.id = employee.manager_id) INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id) WHERE employee.manager_id = ? ORDER BY employee.id', [mngrId]);
    }

    getEmpsByRole(roleId) {
        return query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) manager_name FROM ((employee LEFT JOIN employee manager ON manager.id = employee.manager_id) INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id) WHERE role.id = ? ORDER BY employee.id', [roleId]);
    }

    getEmpsWithMngr(mngrId) {
        return query('SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id FROM employee WHERE employee.manager_id = ? ORDER BY employee.id', [mngrId]);
    }

    getRoles() {
        return query('SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id');
    }

    getRolesByDept(deptId) {
        return query('SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id WHERE department.id = ?', [deptId]);
    }

    getRoleById(roleId) {
        return query('SELECT role.id, role.title, role.salary FROM role WHERE role.id = ?', [roleId]);
    }

    getDepts() {
        return query('SELECT department.id, department.name AS department FROM department');
    }

    getDeptById(deptId) {
        return query('SELECT department.id, department.name AS department FROM department WHERE department.id = ?', [deptId]);
    }

    getBudgetByDept(deptId) {
        return query('SELECT department.name AS department, SUM(role.salary) AS Total_Budget_For_Department FROM (employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id) WHERE department.id = ? GROUP BY department', [deptId]);
    }

    createEmp(emp) {
        if (emp.empMngr === -1) {
            return query('INSERT INTO employee SET ?', { first_name: emp.empFirst, last_name: emp.empLast, role_id: emp.empRole });
        } else {
            return query('INSERT INTO employee SET ?', { first_name: emp.empFirst, last_name: emp.empLast, role_id: emp.empRole, manager_id: emp.empMngr });
        }
    }

    createDept(dept) {
        return query('INSERT INTO department SET ?', { name: dept.deptName });
    }

    createRole(role) {
        return query('INSERT INTO role SET ?', { title: role.roleTitle, salary: role.roleSalary, department_id: role.roleDept });
    }

    updateEmpRole(roleId, empId) {
        return query('UPDATE employee SET ? WHERE ?', [
            {
                role_id: roleId
            },
            {
                id: empId
            }
        ]);
    }

    updateEmpMngr(mngrId, empId) {
        return query('UPDATE employee SET ? WHERE?', [
            {
                manager_id: mngrId
            },
            {
                id: empId
            }
        ]);
    }

    remove(table, id) {
        return query('DELETE FROM ?? WHERE id = ?', [table, id]);
    }
}

module.exports = employeeData;