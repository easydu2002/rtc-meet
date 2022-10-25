
function ResponseError (message: string) {
  Error.call(this, message)
  this.name = 'ResponseError'
}

ResponseError.prototype = Object.create(Error.prototype)

export default ResponseError
