//crear las rutas del crud
import { Router, Request, Response } from "express";
import logger from "../lib/logger";
import NotificationController from './controller/controller.notification';
import INotification from "./interfaces/notification.interface";

const routes = Router();
const notification = new NotificationController
//Ruta creacion de contacto
routes.post('/create', async( req: Request, res: Response ) => {
    const body = req.body
    const notificationRequest = body

    try {
        const response = await notification .createNotificacion(notificationRequest)
        return res.status(response.code).json(response)
    } catch( err: any ) {
        return res.status(err.code ? err.code : 500).json(err)
    }
})
//Ruta a la busqueda de un contacto por num de telefono
routes.get('/search/:notification_type', async( req: Request, res: Response ) => {
    const notification_type = req.params.notificacion_type

    try {
        const response = await notification.getNotificacion(String(notification_type))
        return res.status(response.code).json(response)
    } catch( err: any ) {
        return res.status(err.code ? err.code : 500).json(err)
    }
})


//--------------------------------------------------------------

routes.delete('/delete/:notification_type',async(req:Request,res:Response)=>{
    const notificacion_type = req.params.notificacion_type
    try{
        const response = await notification.deleteNotification(String(notificacion_type))
        return res.status(response.code).json(response)
    }catch( err: any){
        return res.status(err.code ? err.code: 500).json(err)
    }
})
routes.put('/update',async(req:Request,res:Response)=>{ 
   const body = req.body
   const notificationReq:INotification=body
    try{
        const response = await notification.updateNotificacion(notificationReq)
        return res.status(response.code).json(response)
    }catch(err:any){
        return res.status(err.code ? err.code:500).json(err)
    }
})


export default routes;