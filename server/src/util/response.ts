import { Request, Response } from 'express'
import { QueryUserIdKey } from '../common/contant'

const responseMessageMapping: Map<ResponseType, string> = new Map()

export enum ResponseType {
  SUCCESS = 200,
  USER_Authentication_ERROR = 401,
  USER_Authorization_ERROR = 403,
}

responseMessageMapping.set(ResponseType.SUCCESS, '响应成功!')
responseMessageMapping.set(ResponseType.USER_Authentication_ERROR, '登录失败!')
responseMessageMapping.set(ResponseType.USER_Authorization_ERROR, '没有权限!')

export const response = function (res: Response) {
  return {
    send: (type: ResponseType, data?: any, msg?: string) => {
      msg = msg ?? responseMessageMapping.get(type)
      res.statusCode = type
      res.json({
        code: type,
        msg,
        data
      })
    }
  }
}

export const errHandler = function (res: Response, err: Error) {
  response(res).send(ResponseType.SUCCESS, err.message)
}

export const setUserIDToRequest = function (userId: number, request: Request): void {
  request.query[QueryUserIdKey] = String(userId)
}

export const getUserIDFromRequest = function (request: Request): number | undefined {
  return Number(request.query[QueryUserIdKey]) || undefined
}
