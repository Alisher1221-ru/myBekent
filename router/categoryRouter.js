import {Router} from "express"
import { createdCategory, deleteCategory, getCategory, getCategorys, updateCategory } from "../controller/category.controller.js"

const categoryServer = Router()

categoryServer.get('/:id', getCategory)
categoryServer.get('/', getCategorys)
categoryServer.post('/', createdCategory)
categoryServer.patch('/:id', updateCategory)
categoryServer.delete('/:id', deleteCategory)

export default categoryServer
