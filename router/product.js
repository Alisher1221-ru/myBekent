import { Router } from "express";
import { deleteControler, getControler, postControler, updateControler } from "../controller/product..controler.js";
import Role from "../examination/Role.guard.js";

const productServer = Router()

productServer.get('/', getControler)
productServer.post('/', Role("Admins@gmail.com"), postControler)
productServer.patch('/', Role('Admins@gmail.com'), updateControler)
productServer.delete('/', Role('Admins@gmail.com'), deleteControler)


export default productServer
