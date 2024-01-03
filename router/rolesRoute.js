import { Router } from "express";
import { login, signin, refresh, logout, getUsers, getUser } from "../controller/admin.controller.js";
import authGuard from "../examination/Auth.guard.js";

const roleServers = Router()

roleServers.get('/login', login)
roleServers.get('/:id', getUser)
roleServers.get('/', getUsers)
roleServers.post('/signin', signin)
roleServers.post('/refresh', authGuard, refresh)
roleServers.post('/logout', authGuard, logout)

export default roleServers
