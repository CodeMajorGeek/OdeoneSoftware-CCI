const express = require("express")
const app = express()

app.use(express.json())

const PORT = process.env.PORT_API || 9999
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}.`)
})