import { generateToken, validateToken } from './../src/util/token'

test('token', () => {
  const token = generateToken({ username: 'easydu', userId: 1000 })

  expect(!!validateToken(token)).toBe(true)
})
