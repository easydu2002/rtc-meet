import config from '../../config'

export const getServerUrl = function () {
  return `${'http'}://${config.http.host}:${config.http.port}`
}
