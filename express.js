var Flash = require("./flash")
var hasOwn = Function.call.bind(Object.hasOwnProperty)
var onHeaders = require("on-headers")

module.exports = function(req, res, next) {
	var flash = new Flash(req.signedCookies.flash)
	req.flash = res.locals.flash = flash.get.bind(flash)
	res.flash = flash.set.bind(flash)
	onHeaders(res, respond.bind(null, flash, req, res))
	next()
}

function respond(flash, req, res) {
	flash = flash.toJSON()

	if (!isOwnEmpty(flash)) res.cookie("flash", flash, {
		signed: true, httpOnly: true, secure: req.secure
	})
	else if ("flash" in req.signedCookies) res.clearCookie("flash")
}

function isOwnEmpty(obj) {
	for (var key in obj) if (hasOwn(obj, key)) return false
	return true
}
