const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const app = express()

app.use(express.json())

const authMiddleware = require("./middlewares/AuthMiddleware")

// app.use(authMiddleware.authenticateToken)

const URL_BASE = process.env.URL_BASE || "/api/v1"

const authRoutes = require("./routes/AuthRoutes")
const userRoutes = require("./routes/UserRoutes")
const summaryRoutes = require("./routes/SummaryRoutes")
const functionRoutes = require("./routes/FunctionRoutes")
const faqRoutes = require("./routes/FaqRoutes")
const tutorialRoutes = require("./routes/TutorialRoutes")

app.use(`${URL_BASE}/auth`, authRoutes)
app.use(`${URL_BASE}/users`, userRoutes)
app.use(`${URL_BASE}/summary`, summaryRoutes)
app.use(`${URL_BASE}/function`, functionRoutes)
app.use(`${URL_BASE}/faq`, faqRoutes)
app.use(`${URL_BASE}/tutorial`, tutorialRoutes)

const PORT = process.env.PORT_API || 9999
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}.`)
})