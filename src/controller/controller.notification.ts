import INotification from '../interfaces/notification.interface';
import IResponse from '../interfaces/response.interface';
import Notificacion from '../models/model.notification';
import mongoose, {Types} from "mongoose";
import NotificationSocket from "../sockets/notification.socket";
import Server from "../class/server.class";
import {ObjectId} from "mongodb"
import ModelAdmin from "../models/model.admin";

export default class NotificationController {


    public createNotificacion(notificacion: INotification, role: string, userId: string): Promise<IResponse> {
        return new Promise((resolve, reject) => {

            // Logic of sockets
            let lists: string[] | undefined = notificacion.reading_users

            // Verify user to objectId
            if (lists != undefined) {
                lists.forEach((e) => {
                    if (!ObjectId.isValid(e)) {
                        reject({
                            ok: false,
                            message: 'Alguno de los usuarios de la lista es incorrecto',
                            response: 'N/A',
                            code: 500
                        })
                    }
                })
            }

            /*
            if (role != 'admin') {
                return reject({ok: false, message: 'Rol incorrecto', code: 403})
            }
            */

            notificacion.createdUser = new mongoose.Types.ObjectId(userId);
            Notificacion.create(notificacion, (err: any, newNotificacion: any) => {
                if (err) return reject({ok: false, message: 'Fallo en la base de datos', response: err, code: 500})

                // Instance
                const object: NotificationSocket = new NotificationSocket(Server.instance.client, Server.instance.io, false)

                // All users or some users
                if (lists == undefined) {
                    object.sendAllUsers(notificacion)
                } else {
                    ModelAdmin.find({_id: {$in: lists}}, {socketId: 1}, (err: any, notificationDB: any) => {
                        console.log(notificationDB);
                        notificationDB.forEach((e: any) => {
                            object.sendSomeUsers(notificacion, e.socketId)
                        })
                    });
                }

                return resolve({
                    ok: true,
                    message: 'Notificacion creada con exito',
                    response: newNotificacion,
                    code: 201
                })

            })
        })
    }

    //Delete
    public deleteNotification(offer_id: String): Promise<IResponse> {
        return new Promise((resolve, reject) => {
            Notificacion.deleteOne({offer_id: offer_id}, (err: any, notificationDB: any) => {
                if (err) return reject({ok: false, message: 'Fallo en base de datos', response: err, code: 500})

                if (notificationDB.deletedCount === 0) {
                    return reject({
                        ok: false,
                        message: 'No se encontro el registro para ser eliminado',
                        response: null,
                        code: 404
                    })
                }
                return resolve({ok: true, message: 'Notificacion eliminada!', response: notificationDB, code: 200})
            })
        })
    }

    //Get
    public getNotificacion(offer_id: String): Promise<IResponse> {
        return new Promise((resolve, reject) => {
            Notificacion.findOne({offer_id: offer_id}, (err: any, notificationDB: any) => {
                if (err) return reject({ok: false, message: 'Fallo en base de datos', response: err, code: 500})
                if (!notificationDB) {
                    return reject({
                        ok: false,
                        message: 'No se encontro el registro para ser mostrado',
                        response: null,
                        code: 404
                    })
                }
                return resolve({ok: true, message: 'Notificacion encontrada!', response: notificationDB, code: 200})
            })
        })
    }

    //Update
    public updateNotificacion(notificacion: INotification): Promise<IResponse> {
        return new Promise((resolve, reject) => {
            Notificacion.findOneAndUpdate({notification_type: notificacion.notification_type}, {
                message: notificacion.message,
                reading_users: notificacion.reading_users,

            }, {
                returnOriginal: false
            }, (err: any, notificationDB: any) => {

                if (err) return reject({ok: false, message: 'Fallo en base de datos', response: err, code: 500})

                if (!notificationDB) {
                    return reject({ok: false, message: 'No se encontro el id', response: null, code: 404})
                }

                return resolve({ok: true, message: 'Registro actualizado', response: notificationDB, code: 200})
            })
        })

    }

}