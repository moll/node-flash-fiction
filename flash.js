module.exports = Flash

function Flash(messages) {
	this.old = messages ? Object.create(messages) : {}
	this.new = {}
}

Flash.prototype.get = function(name) {
	var neo = this.new
	var old = this.old

	switch (arguments.length) {
		case 0:
			// Return keys as own properties for easier JSON.stringifying.
			assign(old, neo)
			for (var key in neo) delete neo[key]
			return assign({}, old)

		default:
			if (name in neo) { old[name] = neo[name]; delete neo[name] }
			return old[name]
	}
}

Flash.prototype.set = function(name, value) {
	if (typeof name === "object") assign(this.new, name)
	else this.new[name] = value
}

Flash.prototype.toJSON = function() {
	return this.new
}

function assign(a, b) { for (var key in b) a[key] = b[key]; return a }
