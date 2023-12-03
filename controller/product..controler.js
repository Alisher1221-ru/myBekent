import db from "../config/db.config.js"

async function getControler(req, res) {
    try {
        const [product] = await db.query("SELECT * FROM products") 
        res.json(product)
    } catch (error) {
        res.status(401).json("error in "+ error.message)
    }
}

async function postControler(req, res) {
    try {
        const {name, price, img, title} = req.body
        if (!name || !price || !img || !title) {
            const err = new Error("error in "+ err.message)
            err.status = 400
            throw err
        }
        const [[product]] = await db.query("SELECT * FROM products WHERE name = ? OR title = ?", [name, title])
        if (product) {
            const err = new Error("error in "+ err.message)
            err.status = 400
            throw err
        }
        const addProducts = await db.query("INSERT INTO products (name, price, img, title) VALUE (?, ?, ?, ?)", [name, price, img, title])
        res.json(addProducts)
    } catch (error) {
        res.status(401).json("error in "+ error.message)
    }
}

async function updateControler(req, res) {
    try {
        const {name, price, img, title} = req.body
        if (!name ||!price ||!img ||!title) {
            const err = new Error("error in "+ err.message)
            err.status = 401
            throw err
        }
        const querys = req.query.name;
        const [[updateProducts]] = await db.query("SELECT * FROM products WHERE name = ?", [querys])
        if (!updateProducts) {
            const err = new Error("error in "+ err.message)
            err.status = 401
            throw err
        }
        res.json('good')
        db.query("UPDATE products SET name = ?, price = ?, img = ?, title = ? WHERE id = ?", [name, price, img, title, updateProducts.id])
    } catch (error) {
        res.status(401).json("error in "+ error.message)
    }
}

async function deleteControler(req, res) {
    try {
        const {name, price} = req.body
        if (!name ||!price) {
            const err = new Error("error in "+ err.message)
            err.status = 401
            throw err
        }
        const [[daleteProducts]] = await db.query("SELECT * FROM products WHERE name = ?", name)
        if (!daleteProducts) {
            const err = new Error("error in "+ err.message)
            err.status = 401
            throw err
        }
        db.query("DELETE FROM products WHERE id = ?", daleteProducts.id)
        res.json('good')
    } catch (error) {
        res.status(401).json("error in "+ error.message)
    }
}

export {
    getControler,
    postControler,
    updateControler,
    deleteControler
}

