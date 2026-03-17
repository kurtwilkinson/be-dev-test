import express from "express"
import User from "../controller/user.js"

const Router = express.Router()

Router.get("/user", User.getAll)
Router.get("/user/:id", User.findById)

export default Router
