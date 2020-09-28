/*eslint-env es6*/
const express = require("express");
const app = express();
const { join } = require("path");
const fs = require("fs");
let io = require("socket.io");

const setSocketServer = (server) => (io = io(server));
const CheckIfValidDirectory = (fullpath, directory) => (fs.existsSync(fullpath) ? directory : null);
const SetDir = (directory) => app.use(express.static(directory));
const DisplayInfoServer = (port, socket, dir) => {
	const portString = `Server running on localhost:${port}`;
	const socketString = `with ${socket ? "SocketIO support," : "Express support,"}`;
	const dirString = `${dir ? `currently hosting static files located at "${dir}"` : "not hosting any static files"}`;
	console.log(portString, socketString, dirString);
};

class ServerHandler {
	/**
	 * Server class handler for Eonil
	 * @param {{port:number, isSocket:boolean, directory:string}}
	 */
	constructor({ port, isSocket, directory }) {
		this.port = port || 5000;
		this.isSocket = isSocket || false;
		this.fullPath = directory ? join(__dirname, directory) : null;
		this.directory = directory ? CheckIfValidDirectory(this.fullPath, directory) : null;
	}
	/**
	 * Starts server on assigned port
	 *
	 **/
	StartServer = () => {
		this.directory ? SetDir(this.fullPath) : null;
		const server = app.listen(this.port);
		this.isSocket ? setSocketServer(server) : null;
		DisplayInfoServer(this.port, this.isSocket, this.directory);
		return this;
	};
	/**
	 * @returns {(app)} Returns back express app object with type
	 */
	GetApp = () => {
		return app;
	};
	/**
	 * @returns {(express)} Returns back express app object
	 */
	GetExpressInstance = () => {
		return express;
	};
	/**
	 * @returns {(io)} Returns back server object
	 */
	GetIo = () => {
		return io;
	};
	/**
	 * @returns Returns object containing app, express, io
	 *
	 */
	GetAllInstances = () => {
		return this.isSocket ? { app, express, io } : { app, express };
	};
}

module.exports = ServerHandler;
