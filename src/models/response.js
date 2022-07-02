class StructResponse {
  constructor(messageOK = {}, messageError = {}, data = null) {
    this.messageOK = {
      code: messageOK.code || null,
      message: messageOK.message || null
    },
    this.messageError = {
      code: messageError.code || null,
      message: messageError.message || null
    },
    this.data = data
  }
}

module.exports = StructResponse
