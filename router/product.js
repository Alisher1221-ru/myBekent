import { Router } from "express";
import { deleteControler, getProducts, getProduct, postControler, updateControler } from "../controller/product..controler.js";
import authGuard from "../examination/Auth.guard.js";
import RoleGuart from "../examination/Role.guard.js";

const productServer = Router()

productServer.get('/:id', getProduct)
productServer.get('/', getProducts)
productServer.post('/', authGuard, RoleGuart, postControler)
productServer.patch('/:id', authGuard, RoleGuart, updateControler)
productServer.delete('/:id', authGuard, RoleGuart, deleteControler)

export default productServer
