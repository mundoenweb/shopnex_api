const handlerMoveImage = (image, folder) => {
  return new Promise((resolve, _) => {
    const extension = image.name.split('.')[1]
    image.name = `${image.md5}.${extension}`
  
    image.mv(`./public/images/${folder}/${image.name}`, (err) => {
      if (err) {
        image.pathDB = ''
        return resolve(false)
      }
      image.pathDB = `/public/images/${folder}/${image.name}`
      resolve(true)
    })
  })
}

module.exports = {
  handlerMoveImage
}
