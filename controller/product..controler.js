import db from "../config/db.config.js"

async function getProducts(req, res) {
    try {
        const [product] = await db.query("SELECT * FROM product") 
        if (!product){
            const error = new Error("error product not found")
            error.status = 402
            throw error
        }
        res.json(product)
    } catch (error) {
        res.status(401).json("error in "+ error.message)
    }
}

async function getProduct(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("id is not defined")
            error.status = 403
            throw error
        }
        const [[product]] = await db.query("SELECT * FROM product WHERE id = ?", id)
        if (!product) {
            const error = new Error("product is not defined")
            error.status = 403
            throw error
        }
        res.json(product)
    } catch (error) {
        res.status(403).json({error: error.message})
    }
}

async function postControler(req, res) {
    try {
        const {name, price, img, title, status} = req.body
        if (!name || !price || !img || !title || !status) {
            const err = new Error("error in "+ err.message)
            err.status = 400
            throw err
        }
        const [[product]] = await db.query("SELECT * FROM product WHERE name = ? OR title = ?", [name, title])
        if (product) {
            const err = new Error("error in "+ err.message)
            err.status = 400
            throw err
        }
        await db.query("INSERT INTO product SET ?", {name, price, img, title, status})
        res.json('product created')
    } catch (error) {
        res.status(401).json("error in "+ error.message)
    }
}

async function updateControler(req, res) {
    try {
        const body = req.body
        if (!body) {
            const err = new Error("error in "+ err.message)
            err.status = 401
            throw err
        }
        const id = req.params.id;
        const [[product]] = await db.query("SELECT * FROM product WHERE id = ?", id)
        if (!product) {
            const err = new Error("error in "+ err.message)
            err.status = 401
            throw err
        }
        await db.query("UPDATE product SET ? WHERE id = ?", [body, id])
        res.json('product updated')
    } catch (error) {
        res.status(401).json("error in "+ error.message)
    }
}

async function deleteControler(req, res) {
    try {
        const id = req.params.id
        const [[product]] = await db.query("SELECT * FROM product WHERE id = ?", id)
        if (!product) {
            const err = new Error("error in "+ err.message)
            err.status = 401
            throw err
        }
        await db.query("DELETE FROM product WHERE id = ?", id)
        res.json('product deleted')
    } catch (error) {
        res.status(401).json("error in "+ error.message)
    }
}

export {
    getProducts,
    getProduct,
    postControler,
    updateControler,
    deleteControler
}

