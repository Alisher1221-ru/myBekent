import express from "express"
import env from "./config/env.config.js"
import productServer from "./router/product.js"
import roleServers from "./router/rolesRoute.js"

const port = env.PORT

const appServer = express()

appServer.use(express.json())
appServer.use('/producd', productServer)
appServer.use('/admins', roleServers)

appServer.listen(port, () => console.log(`Server Run port ${port} server`))
