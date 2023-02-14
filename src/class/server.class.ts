import config from 'config'
import express from 'express'
import http from 'http'
import logger from '../../lib/logger'
import MongoConn from '../../lib/mongodb'


export default class Server {
    private port: number
    private httpServer: http.Server
    private static _instance: Server
    private mongodb: MongoConn
    public app: express.Application

   private constructor() {
        this.port = config.get('api.port')
        this.app = express()
        this.httpServer = new http.Server(this.app)
        this.mongodb = MongoConn.instance
        
    }

    public static getInstance() {
        if(!Server._instance){
            Server._instance = new Server;
        }
        //return this._instance || ( this._instance = new this() )
        return Server._instance;
    }

    async start() {
        try {
            await this.httpServer.listen(this.port)
            logger.info(`Server run in port number  ${this.port}`)
            
        } catch( err ) {
            logger.error(`Error ${JSON.stringify(err)}`)
        }
    }
}