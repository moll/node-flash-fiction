Flash Fiction.js
================
[![NPM version][npm-badge]](https://www.npmjs.com/package/flash-fiction)

Flash Fiction.js is an **object for storing keys and values** and later **serializing unused/unread ones**. It's primarily useful for storing informational and error messages in web apps for page rendering or redirects. It comes with middleware for [Connect.js][connect] and [Express.js][express] that **stores unused messages in signed cookies for the next request**. It's similar in spirit to Rails's [ActionDispatch::Flash](http://api.rubyonrails.org/classes/ActionDispatch/Flash.html).

The middleware works with Express v4 and assumes you've set up `cookie-parser` with a secret. Another cookie parser library will work, too, if it has an equivalent API (`res.signedCookies`).

[npm-badge]: https://img.shields.io/npm/v/flash-fiction.svg
[connect]: https://github.com/senchalabs/connect
[express]: http://expressjs.com


Installing
----------
```sh
npm install flash-fiction
```

Flash Fiction.js follows [semantic versioning](http://semver.org), so feel free to depend on its major version with something like `>= 1.0.0 < 2` (a.k.a `^1.0.0`).


Using
-----
```javascript
var Express = require("express")
var app = Express()
app.use(require("cookie-parser")(COOKIE_SECRET))
app.use(require("flash-fiction/express"))
```

After the Flash middleware has run, you'll have `flash` functions available on the request and response objects for getting and setting messages respectively.

In your HTTP handler, call `res.flash` to set a message (you can pass it any JSON-compatible value):

```javascript
app.post("/models", function(req, res) {
  // ... Something that saves the model.
  res.flash("info", "Created successfully.")
  res.redirect("/models/42")
})
```

Then once your client's browser follows the redirect, you have `req.flash` to read the value back out:

```javascript
app.get("/models/:id", function(req, res) {
  if (req.flash("info")) console.log(req.flash("info"))
  res.render("models/read")
})
```

The getter function is also available as a local variable in templates.  
For example, a Jade/Pug template would look like the following:

```jade
if flash("error")
  h1 Uh-oh!
  p= flash("error")
```

### Accessing Immediately Without Redirect
Sometimes you don't need to do a redirect, but would still like to use the flash object for passing messages to the view. Set and get flash messages as before with `res.flash("info", msg)` and `req.flash("info")`. You can access set messages immediately on `req.flash`. Flash Fiction.js is even also smart enough to then not serialize that used key for the next request.

### Serializing for JavaScript
If you'd like to pass the flash messages from Node's side to client side JavaScript, you can call `flash` without any arguments in your template to get all the messages back.

```jade
script window.flash = #{JSON.stringify(flash()).replace(/<\//g, "<\\/")}
```

Remember to escape `</` lest you create a security vulnerability due to in-band signaling of one `<script>` tag's end and the other's beginning.


### Using without Connect/Express
If you'd like to use the `Flash` object yourself without the middleware, `require` it:

```javascript
var Flash = require("flash-fiction")
var flash = new Flash({info: "OK"})
flash.set("notice", "OMG")
flash.get("info") // => "OK"
flash.get() // => {info: "OK", notice: "OMG"}
```


License
-------
Flash Fiction.js is released under a *Lesser GNU Affero General Public License*, which in summary means:

- You **can** use this program for **no cost**.
- You **can** use this program for **both personal and commercial reasons**.
- You **do not have to share your own program's code** which uses this program.
- You **have to share modifications** (e.g. bug-fixes) you've made to this program.

For more convoluted language, see the `LICENSE` file.


About
-----
**[Andri Möll][moll]** typed this and the code.  
[Monday Calendar][monday] supported the engineering work.

If you find Flash Fiction.js needs improving, please don't hesitate to type to me now at [andri@dot.ee][email] or [create an issue online][issues].

[email]: mailto:andri@dot.ee
[issues]: https://github.com/moll/node-flash-fiction/issues
[moll]: http://themoll.com
[monday]: https://mondayapp.com
