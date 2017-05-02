// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { nativeImage } = require('electron')
const { resolve } = require('path')
const { writeFile } = require('fs')

const image = nativeImage.createFromPath(resolve(__dirname, './lena_std.png'))
let { width, height } = image.getSize()
const bufferLength = image.toBitmap().length
console.log('original image', width, height, bufferLength, width * height * 4)

const crop = image.crop({x: 20, y: 20, width: 22, height: 33})
const { width:_width, height:_height } = crop.getSize()
const cropLength = crop.toBitmap().length
const _cropLength = crop.getBitmap().length
console.log('cropped image', _width, _height, cropLength, _cropLength, _width * _height * 4)
