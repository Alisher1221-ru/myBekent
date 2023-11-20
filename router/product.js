import { Router } from "express";
import { getControler, postControler } from "../controller/product..controler.js";

const productServer = Router()

productServer.get('/', getControler)
productServer.post('/', postControler)

export default productServer
