const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const app = express()

app.use(express.json())

const db = require("./services/DatabaseService")

const authMiddleware = require("./middlewares/AuthMiddleware")

app.use(authMiddleware.authenticateToken)

const URL_BASE = process.env.URL_BASE || "/api/v1"
const authRoutes = require("./routes/AuthRoutes")

app.use(`${URL_BASE}/auth`, authRoutes)

const PORT = process.env.PORT_API || 9999
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}.`)
})