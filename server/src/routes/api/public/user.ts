import { Router } from 'express'

export const bindUserRouter = function (router: Router) {
  router.get('/user/friends/:id', (res, req) => {
    req.send(res.params)
  })
}
