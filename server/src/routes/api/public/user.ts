import { Router } from 'express'

const userRouter = Router()
userRouter.get('/user/friends/:id', (res, req) => {
  req.send(res.params)
})

export const bindUserRouter = (router: Router): Router => router.use(userRouter)
