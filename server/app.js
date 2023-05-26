import express from "express"
import mongoose from "mongoose"
import http from "http"
import config from "./config/config"
import expressConfig from "./frameworks/webserver/express"
import mongoDbConnection from "./frameworks/database/mongoDB/connection"
import serverConfig from "./frameworks/webserver/server"
import routes from "./frameworks/webserver/routes"

const app = express()
const server = http.createServer(app)

// express js config
expressConfig(app)

// server config and start
serverConfig(server,config).startServer();

// Database config and connection Create

mongoDbConnection(mongoose,config).connectToMongoDB()

// routes for each endpoints

routes(app,express)

export default app