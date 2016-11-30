var Flash = require("../flash")
var demand = require("must")

describe("Flash", function() {
	describe("new", function() {
		it("must be an instance of Flash", function() {
			new Flash().must.be.an.instanceof(Flash)
		})
	})

	describe(".prototype.get", function() {
		describe("given nothing", function() {
			it("must return old messages", function() {
				var flash = new Flash({info: "OK", notice: "OMG"})
				flash.get().must.eql({info: "OK", notice: "OMG"})
			})

			it("must return new messages", function() {
				var flash = new Flash
				flash.set("info", "OK")
				flash.set("notice", "OMG")
				flash.get().must.eql({info: "OK", notice: "OMG"})
			})

			it("must return new messages twice", function() {
				var flash = new Flash
				flash.set("info", "OK")
				flash.set("notice", "OMG")
				flash.get().must.eql({info: "OK", notice: "OMG"})
				flash.get().must.eql({info: "OK", notice: "OMG"})
			})

			it("must return old and new messages", function() {
				var flash = new Flash({info: "OK"})
				flash.set("notice", "OMG")
				flash.get().must.eql({info: "OK", notice: "OMG"})
			})

			it("must return old and new messages twice", function() {
				var flash = new Flash({info: "OK"})
				flash.set("notice", "OMG")
				flash.get().must.eql({info: "OK", notice: "OMG"})
				flash.get().must.eql({info: "OK", notice: "OMG"})
			})

			it("must return old and new messages as own properties", function() {
				var flash = new Flash({info: "OK", notice: "OMG"})
				flash.set("info", "Done")
				flash.set("warning", "Beware")

				var obj = flash.get()
				obj.must.have.own("info", "Done")
				obj.must.have.own("notice", "OMG")
				obj.must.have.own("warning", "Beware")
				obj.must.have.keys(["info", "notice", "warning"])
			})

			it("must not serialize accessed messages", function() {
				var flash = new Flash
				flash.set("info", "OK")
				flash.get()
				serialize(flash).must.eql({})
			})
		})

		describe("given name", function() {
			it("must return old messages", function() {
				var flash = new Flash({info: "OK", notice: "OMG"})
				flash.get("info").must.equal("OK")
				flash.get("notice").must.equal("OMG")
			})

			it("must return new messages", function() {
				var flash = new Flash
				flash.set("info", "OK")
				flash.set("notice", "OMG")
				flash.get("info").must.equal("OK")
				flash.get("notice").must.equal("OMG")
			})

			it("must return new messages twice", function() {
				var flash = new Flash
				flash.set("info", "Done")
				flash.get("info").must.equal("Done")
				flash.get("info").must.equal("Done")
			})

			it("must return overwritten messages", function() {
				var flash = new Flash({info: "OK"})
				flash.set("info", "Done")
				flash.get("info").must.equal("Done")
			})

			it("must return overwritten messages twice", function() {
				var flash = new Flash({info: "OK"})
				flash.set("info", "Done")
				flash.get("info").must.equal("Done")
				flash.get("info").must.equal("Done")
			})

			it("must not serialize accessed messages", function() {
				var flash = new Flash
				flash.set("info", "Done")
				flash.get("info")
				serialize(flash).must.eql({})
			})
		})
	})

	describe(".prototype.set", function() {
		it("must return nothing", function() {
			var flash = new Flash
			demand(flash.set("info", "OK")).be.undefined()
		})

		it("must set message", function() {
			var flash = new Flash
			flash.set("info", "OK")
			flash.get("info").must.equal("OK")
		})

		it("must set messages", function() {
			var flash = new Flash
			flash.set({info: "OK", notice: "OMG"})
			flash.get("info").must.equal("OK")
			flash.get("notice").must.equal("OMG")
		})

		it("must serialize new messages", function() {
			var flash = new Flash({info: "OK", notice: "OMG"})
			flash.set("info", "Done")
			flash.set("warning", "Beware")
			serialize(flash).must.eql({info: "Done", warning: "Beware"})
		})

		it("must serialize new messages given none before", function() {
			var flash = new Flash
			flash.set("info", "OK")
			flash.set("notice", "OMG")
			serialize(flash).must.eql({info: "OK", notice: "OMG"})
		})

		it("must serialize accessed but overwritten message", function() {
			var flash = new Flash
			flash.set("info", "Done")
			flash.get("info")
			flash.set("info", "Done")
			serialize(flash).must.eql({info: "Done"})
		})
	})

	describe(".prototype.toJSON", function() {
		it("must not serialize old messages", function() {
			var flash = new Flash({info: "OK", notice: "OMG"})
			serialize(flash).must.eql({})
		})
	})
})

function serialize(obj) { return JSON.parse(JSON.stringify(obj)) }
