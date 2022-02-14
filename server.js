// External modules
const express = require('express')
const app = express();
const package = require('./package.json');
const path = require('path');
const users = require("./users");
const posts = require("./posts");
//const messages = require("./Messages");
const reExt = /\.([a-z]+)/i;
let  port = 2718;

// General app settings
function content_type_from_extension(url) {
	const m = url.match(reExt);
	if(!m) return 'application/son'
	const ext = m[1].toLowerCase();

	switch (ext)
	{
		case 'js': return 'text/javascript';
		case 'css': return 'text/css';
		case 'html': return 'text/html';
	}

	return 'text/plain';
}

const set_content_type = function (req, res, next) 
{
	const content_type = req.baseUrl == '/api' ? "application/json; charset=utf-8":content_type_from_extension(req.url);
	res.setHeader("Content-Type", content_type);
	next()
}

app.use(express.static(path.join(__dirname,'site')));
app.use( set_content_type );
app.use(express.json());  // to support JSON-encoded bodies
app.use(express.urlencoded( // to support URL-encoded bodies
{  
  extended: true
}));

// API general functions

// Version 
function get_version( req, res) 
{
	const version_obj = { version: package.version, description: package.description };
	res.send(  JSON.stringify( version_obj) );   
}

// Routing
const router = express.Router();

app.use('/api',router);
//app.get("/", (req, res) => { res.send("Hello Geeks"); });
router.get('/version', /*auth,*/(req, res) => { get_version(req, res )  } )
router.use('/users',users);
router.use('/posts',posts);
//router.use('/messages',messages);

// Init 
let msg = `${package.description} listening at port ${port}`
app.listen(port, () => { console.log( msg ) ; })