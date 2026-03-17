import "dotenv/config"
import express from "express"
import Router from "./routes/index.js"

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use("/api/v1", Router)

app.listen(port, () => {
    console.log(`Server is running in Port: ${port}`)
})
