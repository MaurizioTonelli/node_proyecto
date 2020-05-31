const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

user.post("/login", async (req,res,next)=>{
    const {user_name, user_password}=req.body;
    const query = `SELECT * FROM administrators WHERE name='${user_name}' AND password='${user_password}';`;
    const rows = await db.query(query);

    if(user_name && user_password){
        if(rows.length== 1){
            const token = jwt.sign({
                user_id : rows[0].user_id,
                user_name : rows[0].user_name
            }, "debugkey");
            return res.status(200).json({code:200, message: token})
        }else{
            return res.status(201).json({code:201, message: "usuario o contraseña incorrectos"})
        }
    }
    return res.status(201).json({code:201, message: "campos incompletos"})
});
user.get("/", async (res,req,next)=>{
    const query = "SELECT * FROM administrators";
    const rows = await db.query(query);
    return res.status(200).json({code:200, message: rows});
});

module.exports = user;