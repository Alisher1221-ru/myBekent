import express from "express"
import env from "./config/env.config.js"
import productServer from "./router/product.js"
import roleServers from "./router/rolesRoute.js"
import categoryServer from "./router/categoryRouter.js"

const port = env.PORT

const appServer = express()

appServer.use(express.json())
appServer.use('/products', productServer)
appServer.use('/reg', roleServers)
appServer.use('/category', categoryServer)

appServer.listen(port, () => console.log(`Server Run port ${port} server`))
