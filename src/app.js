import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()
// To connect frontend and backend
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"})) // To accept json and set the limit
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public")) // to store paths for static things in public so it increases efficiency
app.use(cookieParser())

export {app}