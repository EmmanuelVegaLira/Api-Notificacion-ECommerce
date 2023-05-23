// Imports
import socketIO from 'socket.io'
import INotification from "../interfaces/notification.interface";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import ModelAdmin from "../models/model.admin";

export default class NotificationSocket {

    // Private
    private io: socketIO.Socket
    private server: socketIO.Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
    private isInitial: boolean

    // Constructor of class
    constructor(io: socketIO.Socket | undefined, server: socketIO.Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, isInitial: boolean) {
        // @ts-ignore
        this.io = io
        this.server = server
        this.isInitial = isInitial
        this.saveSocketId()
        this.disconnect()
    }

    /*****************************************************
     *Parameters: @param notification
     *Description: Envia una notificacion a todos
     *****************************************************/
    public sendAllUsers(notification: INotification): void {
        this.io.emit('general-notification', notification)
    }

    /*****************************************************
     *Parameters: @param notification, @param socketId
     *Description: Envia una notificacion a algunos (uno solo)
     *****************************************************/
    public sendSomeUsers(notification: INotification, socketId: string): void {
        this.server.to(socketId).emit('some-notification', notification)
    }

    private async saveSocketId(): Promise<void> {
        if (this.isInitial)
            await ModelAdmin.findByIdAndUpdate(this.io.data.userId, {socketId: this.io.id})
    }

    private disconnect(): void {
        if (this.isInitial)
            this.io.on('disconnect', async () => {
                await ModelAdmin.findByIdAndUpdate(this.io.data.userId, {socketId: "0"})
            })
    }
}