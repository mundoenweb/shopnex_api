const fs = require('fs')
const path = require('path')

module.exports.handlerDeleteFile = (pathFile) => {
  if (!pathFile || typeof pathFile !== 'string') return

  const cd = path.join(__dirname, '../')
  if (fs.existsSync(`${cd}${pathFile}`)) {
    fs.unlinkSync(`${cd}${pathFile}`)
  }
}
