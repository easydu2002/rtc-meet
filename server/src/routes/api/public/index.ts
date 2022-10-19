import { Router } from "express";
import { bindAuthRouter } from "./auth";
import { bindUserRouter } from "./user";


const publicRouter = Router()

bindUserRouter(publicRouter)
bindAuthRouter(publicRouter)

export default publicRouter 

