INSERT INTO department (name)
VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

INSERT INTO role (department_id, salary, title)
VALUES 
    (1, 150000, "Lead Engineer"),
    (1, 120000, "Software Engineer"),
    (2, 160000, "Account Manager"),
    (2, 125000, "Accountant"),
    (3, 250000, "Legal Team Lead"),
    (3, 190000, "Lawyer"),
    (4, 100000, "Sales Lead"),
    (4, 80000, "Salesperson");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Dan", "Simpson", 3, NULL),
    ("Kayla", "Pospisil", 4, 1),
    ("Allison", "Wells", 1, NULL),
    ("Bernard", "Isaacs", 2, 3),
    ("Sy", "Berman", 5, NULL),
    ("Max", "Saltzman", 6, 5),
    ("Tanya", "Vanderpoel", 7, NULL),
    ("Caitlin", "Brentford", 8, 7),
    ("Philip", "Marlowe", 8, 7);
