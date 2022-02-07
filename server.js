// External modules
const express = require('express')
const StatusCodes = require('http-status-codes').StatusCodes;
const package = require('./package.json');
const users = require("./Users");
const posts = require("./Posts");
//const messages = require("./Messages");
const app = express();

let  port = 2718;

// General app settings
const set_content_type = function (req, res, next) 
{
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	next()
}

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

router.get('/version', /*auth,*/(req, res) => { get_version(req, res )  } )
router.use('/users',users);
router.use('/posts',posts);
//router.use('/messages',messages);

// Init 
let msg = `${package.description} listening at port ${port}`
app.listen(port, () => { console.log( msg ) ; })