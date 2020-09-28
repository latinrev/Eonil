# Eonil

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues) [![Known Vulnerabilities](https://snyk.io/test/github/latinrev/Eonil/badge.svg?targetFile=package.json)](https://snyk.io/test/github/latinrev/Eonil?targetFile=package.json)

## Eonil is a wrapper for [Express](https://www.npmjs.com/package/express) and [SocketIO](https://www.npmjs.com/package/socket.io) to create a server in one line! (you can choose whether to use express alone or express+socketio)


# Installation

This is done using the npm install command:

```sh
$ npm install eonil
```

# Usage

### Creating an express app with static files in one line

```javascript
//If no port is set the server will start in port 5000 by default
const Eonil = require("eonil");
const app = new Eonil({ port: 5000, directory: "/public" }).StartServer().GetApp();
```

### Creating an express app with no files in one line

```javascript
const Eonil = require("./index");
const app = new Eonil({}).StartServer().GetApp();

app.get("/", (req, res) => {
	res.send("Hello");
});
```

### Creating a socket.io-express app

```javascript
const Eonil = require("eonil");
const SM = new Eonil({
	port: process.env.PORT,
	directory: "./public",
	isSocket: true,
});
const app = SM.StartServer().GetApp();
const io = SM.GetIo();
```

### Retrieving all instances of the manager

```javascript
const Eonil = require("eonil");
const SM = new Eonil({...});
//Only returns io instance if isSocket is true
const { app, express, io } = SM.GetAllInstances();
```

# Examples

### Express

```javascript
const Eonil = require("eonil");
//If no port is set the server will start in port 5000 by default
const app = new Eonil({ directory: "/public" }).StartServer().GetApp();

app.get("/api/test", async (req, res) => {
	res.send("Hello there");
});
```

### Socketio

```javascript
const Eonil = require("eonil");
const SM = new Eonil({
	port: process.env.PORT,
	directory: "./public",
	isSocket: true,
});
const app = SM.StartServer().GetApp();
const io = SM.GetIo();

app.get("/api/test", async (req, res) => {
	res.send("Hello there");
});

io.on("connection", (socket) => console.log(socket));
```

# Plans for the future

-   [] Add certificates support for https
-   [] Creating self signed certificates on the fly for https support

### Built With

    JavaScript

### Contributors

    Joel Castillo

### License

This project is licensed under the MIT License - see the LICENSE.md file for details
Acknowledgments
