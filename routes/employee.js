const express = require('express');
const jwt = require('jsonwebtoken');
const employee = express.Router();
const db = require('../config/database');

employee.post("/login", async (req,res,next)=>{
    
});
employee.put("/", async (req,res,next)=>{
    const {first_name, last_name, phone_no, address, email} = req.body;
    const query = `INSERT INTO employees VALUES(DEFAULT, 
                    '${first_name}', '${last_name}', '${phone_no}', '${address}', '${email}' )`;
    const rows = await db.query(query);
    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Empleado insertado"});
    }
    return res.status(500).json({code: 404, message: "ocurrio un error"});
});

employee.patch("/:id([0-9]{1,3})", async(req,res,next)=>{
    const {first_name, last_name, phone_no, address, email} = req.body;
    const query = `UPDATE employees SET
                    name = '${first_name}', 
                    last_name ='${last_name}', 
                    phone_no ='${phone_no}', 
                    address = '${address}', 
                    email = '${email}' 
                    WHERE employee_id = ${req.params.id}`;
    const rows = await db.query(query);
    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Empleado actualizado"});
    }
    return res.status(500).json({code: 404, message: "ocurrio un error"});
});

employee.delete("/:id([0-9]{1,3})", async(req,res,next)=>{
    const query = `DELETE FROM employees WHERE employee_id = ${req.params.id}`;
    const rows = await db.query(query);
    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Empleado eliminado"});
    }
    return res.status(500).json({code: 404, message: "ocurrio un error"});
});

employee.get('/', async(req,res,next)=>{
    const query = "SELECT * FROM employees";
    const rows = await db.query(query);
    return res.status(200).json({code:200, message: rows});
});

employee.get('/:name([A-Za-z]+)', async(req,res,next)=>{
    const query = "SELECT * FROM employees WHERE name ILIKE '%"+name+"%' OR last_name ILIKE '%"+name+"%'";
    const rows = await db.query(query);
    return res.status(200).json({code:200, message: rows});
});

module.exports = employee;