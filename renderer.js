// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { nativeImage } = require('electron')
const { resolve } = require('path')
const { writeFile } = require('fs')

const image = nativeImage.createFromPath(resolve(__dirname, './lena_std.png'))
const { width, height } = image.getSize()
const bufferLength = image.toBitmap().length
console.log('original image', width, height, bufferLength, width * height * 4)

const crop = image.crop({x: 20, y: 20, width: 220, height: 330})
const { width:cropWidth, height:cropHeight } = crop.getSize()
const cropLength = crop.toBitmap().length
const _cropLength = crop.getBitmap().length
console.log('cropped image', cropWidth, cropHeight, cropLength, _cropLength, cropWidth * cropHeight * 4)

writeFile(resolve(__dirname, './crop.png'), crop.toPNG(), e => {if (e) console.error(e)})

const buffer = crop.toBitmap()
const crop2 = nativeImage.createFromBuffer(buffer, {
  width: cropWidth,
  height: cropHeight,
})
const cropLength2 = crop2.toBitmap().length
const _cropLength2 = crop2.getBitmap().length
console.log('cropped and restored image', cropWidth, cropHeight, cropLength2, _cropLength2, cropWidth * cropHeight * 4)

const pngBuffer = crop2.toPNG()
writeFile(resolve(__dirname, './crop2.png'), pngBuffer, e => {if (e) console.error(e)})
