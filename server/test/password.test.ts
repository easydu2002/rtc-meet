import { encodePassword, validatePassword } from './../src/util/password'

test('pass', () => {
  const password = 'easydu0211'
  const password2 = 'easydu02113'
  const hashStr = encodePassword(password)

  expect(validatePassword(hashStr, password)).toBe(true)
  expect(validatePassword(hashStr, password2)).toBe(false)
})
