
import INotification from '../interfaces/notification.interface';
import IResponse from '../interfaces/response.interface';
import Notificacion from '../models/model.notification';

export default class NotificationController{
    //creando metodos 
    //Create
    public createNotificacion(notificacion: INotification): Promise<IResponse>{
        return new Promise((resolve, reject)=>{
            Notificacion.create(notificacion,(err: any,newNotificacion:any)=>{
               if (err) return reject({ok: false, message: 'Fallo en la base de datos',response: err, code:500})
                return resolve({ok:true,message:'Notificacion creada con exito',response:newNotificacion,code:201})

            })
        })
    }
    //Delete
    public deleteNotification(notification_type:String): Promise<IResponse>{
        return new Promise((resolve,reject)=>{
            Notificacion.deleteOne({notification_type:notification_type},(err:any,notificationDB:any)=>{
                if ( err ) return reject({ ok: false, message: 'Fallo en base de datos', response: err, code: 500 })

                if ( !notificationDB ) {
                    return reject({ ok: false, message: 'No se encontro el registro para ser eliminado', response: null, code: 404 })
                }
                return resolve({ ok: true, message: 'Notificacion eliminada!', response: notificationDB, code: 200 })
            })
        })
    }
    //Get
    public getNotificacion(notification_type:string):Promise<IResponse>{
        return new Promise((resolve, reject)=>{
            Notificacion.findOne({notificacion_type:notification_type},(err:any,notificationDB:any)=>{
                if (err) return reject({ok: false, message: 'Fallo en base de datos', response: err, code: 500})
            if (!notificationDB){
                return reject({ok: false, message: 'No se encontro el registro para ser mostrado', response: null, code: 404})
            }
            return resolve({ok: true, message: 'Notificacion econtrada!', response: notificationDB, code: 200})
            })
        })
    }
    //Update
    public updateNotificacion(notificacion_type:string):Promise<IResponse>{
        return new Promise((resolve,reject)=>{
            
        })
    }
    
}