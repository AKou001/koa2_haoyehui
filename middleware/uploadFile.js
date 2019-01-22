const fs = require("fs")
const multer = require('koa-multer')
const mkdirp = require('mkdirp')

module.exports = type => {

	let storage = multer.diskStorage({
		destination: function (req, file, cb) {
			let date = new Date()
			let datePath = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
			let path = `./public/uploads/${type}/${datePath}/`
			mkdirp.sync(path)
			cb(null, path)
		},
		filename: function (req, file, cb) {
			let fileFormat = (file.originalname).split(".")
			cb(null, Date.now() + '-' + Math.ceil(Math.random() * 5000) + "." + fileFormat[fileFormat.length - 1])
		}
	})

	return multer({ storage: storage })

}