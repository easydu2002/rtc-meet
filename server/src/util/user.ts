import config from '../../config'
import { getServerUrl } from './server'

export const generateRandomAvatar = function () {
  return `${getServerUrl()}${config.http.staticPrefix}/avatar/a${Math.floor(Math.random() * 5)}.jpg`
}
