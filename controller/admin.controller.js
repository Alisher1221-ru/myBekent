import db from "../config/db.config.js"
import pkg from 'jsonwebtoken';
const {sign, verify} = pkg;
import { hashSync } from "bcrypt";
import env from "../config/env.config.js";

async function signin(req,res) {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            const error = new Error("error is | you didn't specify a user")
            error.status = 401
            throw error 
        }
        const heshingpasswort = hashSync(password, 2)
        const [[user]] = await db.query("SELECT * FROM loginadmin WHERE email = ?", email)
        if (user) {
            const error = new Error("error is | user is already eating")
            error.status = 401
            throw error 
        }
        const [{insertId}] = await db.query("INSERT INTO loginadmin (email, password, role) VALUES (?, ?, ?)", [email, heshingpasswort, "user"])
        const refresh_token = sign(
            {id: insertId, role: "user"},
            env.REFRESH_TOKEN,
            {expiresIn: "30day"}
        );
        db.query("UPDATE loginadmin SET token = ? WHERE email = ?", [refresh_token, email])
        res.json('good')
    } catch (error) {
        res.status(500).json({ error:error.message })
    }
}

async function login(req,res) {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            const error = new Error("error is | you didn't specify a user")
            error.status = 401
            throw error 
        }
        const [[user]] = await db.query("SELECT * FROM loginadmin WHERE email = ?", email)
        if (!user) {
            const error = new Error("error is | user is already eating")
            error.status = 404
            throw error 
        }
        const refresh_token = sign({id: user.id, role: user.role}, env.REFRESH_TOKEN, {expiresIn: "10day"})
        await db.query("UPDATE loginadmin SET token = ? WHERE id = ?",[refresh_token, user.id])
        res.json(user)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function refresh(req,res) {
    try {
        const {token} = req.body
        if (!token) {
            const error = new Error("error is | your token is out of date")
            error.status = 401
            throw error
        }
        const [[user]] = await db.query("SELECT * FROM loginadmin WHERE token = ?", token)
        if (!user) {
            const error = new Error("error is | your token is out of date")
            error.status = 401
            throw error
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function logout(req, res) {
    try {
        const {token} = req.body
        if (!token) {
            const error = new Error("error is | your token is out of date")
            error.status = 401
            throw error
        }
        await db.query("UPDATE loginadmin SET token = ? WHERE token = ?",
        [null, token])
        res.json(undefined)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export {
    login,
    signin,
    refresh,
    logout
}
