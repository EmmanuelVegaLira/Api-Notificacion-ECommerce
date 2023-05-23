import config from 'config'
import express from 'express'
import http from 'http'
import logger from '../../lib/logger'
import MongoConn from '../../lib/mongodb'
import socketIO from 'socket.io'
import {checkTokenIO} from "../middlewares/check-token";
import NotificationSocket from "../sockets/notification.socket";

export default class Server {
    private port: number
    private httpServer: http.Server
    private static _instance: Server
    private mongodb: MongoConn
    public app: express.Application
    public io: socketIO.Server
    public client: socketIO.Socket | undefined

    constructor() {
        this.port = config.get('api.port')
        this.app = express()
        this.httpServer = new http.Server(this.app)
        this.mongodb = MongoConn.instance
        this.io = new socketIO.Server(this.httpServer)
        this.listenSockets()

    }

    public static get instance() {
        return this._instance || (this._instance = new this())
    }

    private listenSockets() {

        // Function that verifies the token by connection
        this.io.use(async (client, next) => {
            await checkTokenIO(client, next)
        });

        // Function connection
        this.io.on('connection', (client) => {
            this.client = client;

            // Notice of successful connection
            this.io.to(client.id).emit('connect-socket', true)

            // Call Sockets
            new NotificationSocket(client, this.io, true)
        })
    }

    async start() {
        try {
            await this.httpServer.listen(this.port)
            logger.info(`Server run in port number  ${this.port}`)

        } catch (err) {
            logger.error(`Error ${JSON.stringify(err)}`)
        }
    }
}