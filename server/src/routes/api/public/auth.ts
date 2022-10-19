import { Router } from "express";

interface AuthData {
  
  username: string,
  password: string

}


export const bindAuthRouter = function(router: Router) {

  router.post('/authentication', (req, res) => {
    const data = req.body as AuthData
    res.send(data)
  })
}