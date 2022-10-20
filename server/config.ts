export default {

  http: {
    staticPrefix: '/static',
    host: '192.168.0.4',
    port: 8888,
    ssl: {
      cert: '',
      key: ''
    }
  },

  // https://www.npmjs.com/package/jsonwebtoken
  token: {
    autoExtension: true,
    secretOrPrivateKey: Math.random().toString(36) + Math.random().toString(36) + Math.random().toString(36),
    expiresIn: '24h'
  },

  mongo: {

    connectUrl: 'mongodb://localhost/rtc_meet'

  }

}
