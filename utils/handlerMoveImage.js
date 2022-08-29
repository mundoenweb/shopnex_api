const handlerMoveImage = (image, folder) => {
  return new Promise((resolve, _) => {
    const extension = image.name.split('.')[1]
    const date = new Date().getTime()
    const newNameImage = `${date}_${image.md5}.${extension}`
    const pathImage = `/public/images/${folder}/${newNameImage}`

    image.mv(`.${pathImage}`, (err) => {
      if (err) {
        resolve({...err, error:true})
        return
      }
      resolve(pathImage)
    })
  })
}

module.exports = {
  handlerMoveImage
}
