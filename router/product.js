import { Router } from "express";
import { deleteControler, getControler, postControler, updateControler } from "../controller/product..controler.js";

const productServer = Router()

productServer.get('/', getControler)
productServer.post('/', postControler)
productServer.patch('/', updateControler)
productServer.delete('/', deleteControler)

export default productServer
