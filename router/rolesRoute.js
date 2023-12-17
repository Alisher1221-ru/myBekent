import { Router } from "express";
import { login, signin, refresh, logout } from "../controller/admin.controller.js";

const roleServers = Router()

roleServers.post('/login', login)
roleServers.post('/signin', signin)
roleServers.post('/refresh', refresh)
roleServers.post('/logout', logout)

export default roleServers
