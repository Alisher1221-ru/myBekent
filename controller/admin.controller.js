import db from "../config/db.config.js"
import pkg from 'jsonwebtoken';
const {sign, verify} = pkg;
import { compareSync, hashSync } from "bcrypt";
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
            const error = new Error("error is | the user already exists")
            error.status = 401
            throw error 
        }
        const [{insertId}] = await db.query("INSERT INTO loginadmin (email, password, role) VALUES (?, ?, ?)", [email, heshingpasswort, "user"])
        const refresh_token = sign({id: insertId, role: user.role}, env.REFRESH_TOKEN, {expiresIn: "10day"})
        const access_token = sign({id: insertId, role: user.role}, env.ACCESS_TOKEN, {expiresIn: "15m"})
        db.query("UPDATE loginadmin SET refreshToken = ? WHERE id = ?", [refresh_token, insertId])
        res.json(refresh_token, access_token)
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
            const error = new Error("error is | the user already exists")
            error.status = 404
            throw error 
        }
        const isPasswordMatches = compareSync(password, user.password)
        if (!isPasswordMatches) {
            const error = new Error("error is | password wrong")
            error.status = 404
            throw error 
        }
        const refresh_token = sign({id: user.id, role: user.role}, env.REFRESH_TOKEN, {expiresIn: "10day"})
        const access_token = sign({id: user.id, role: user.role}, env.ACCESS_TOKEN, {expiresIn: "15m"})
        const hashedRefresh = hashSync(refresh_token, 2)

        await db.query("UPDATE loginadmin SET refreshToken = ? WHERE id = ?", [hashedRefresh, user.id])

        res.json({refresh_token, access_token})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function refresh(req,res) {
    try {
        const {accessToken, refreshToken} = req.body
        if (!refreshToken) {
            const error = new Error("error is | token has expired")
            error.status = 401
            throw error
        }
        const {id, role} = verify(accessToken, env.ACCESS_TOKEN)
        const [[user]] = await db.query("SELECT * FROM loginadmin WHERE id = ?", id)
        if (!user) {
            const error = new Error("error is | the user already exists")
            error.status = 401
            throw error
        }
        const access_token = sign({id, role}, env.ACCESS_TOKEN, {expiresIn:"15m"})
        res.json({access_token, refreshToken})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


async function logout(req, res) {
    try {
        const {refreshToken} = req.body
        if (!refreshToken) {
            const error = new Error("error is | your token is out of date")
            error.status = 401
            throw error
        }
        const {id} = verify(refreshToken, env.REFRESH_TOKEN)
        await db.query("UPDATE loginadmin SET refreshToken = ? WHERE id = ?",
        [null, id])
        res.json(id)
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
