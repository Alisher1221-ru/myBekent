import db from "../config/db.config.js"

async function getControler(req, res) {
    try {
        const [product] = await db.query("SELECT * FROM products") 
        res.json(product)
    } catch (error) {
        res.json("error in "+ error.message)
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
        res.json("error in "+ error.message)
    }
}

export {
    getControler,
    postControler
}
