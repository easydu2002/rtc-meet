import { generateToken, validateToken } from './../src/util/token'

test('token', () => {
  const token = generateToken({ username: 'easydu' })

  expect(!!validateToken(token)).toBe(true)
})
