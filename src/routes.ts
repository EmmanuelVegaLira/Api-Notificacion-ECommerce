// Imports
import {Router, Request, Response} from "express";
import NotificationController from './controller/controller.notification';
import INotification from "./interfaces/notification.interface";

const routes = Router();
const notification = new NotificationController

// Create notification
routes.post('/create', async (req: Request, res: Response) => {
    const body = req.body
    const notificationRequest = body
    const role = body.user.role
    const userId = req.body.user._id;
    try {
        const response = await notification.createNotificacion(notificationRequest, role, userId)
        return res.status(response.code).json(response)
    } catch (err: any) {
        return res.status(err.code ? err.code : 500).json(err)
    }
})

// Search offers
routes.get('/search/:offer_id', async (req: Request, res: Response) => {
    const offer = req.params.offer_id

    try {
        const response = await notification.getNotificacion(String(offer))
        return res.status(response.code).json(response)
    } catch (err: any) {
        return res.status(err.code ? err.code : 500).json(err)
    }
})

// Delete offers
routes.delete('/delete/:offer_id', async (req: Request, res: Response) => {
    const offer = req.params.offer_id
    try {
        const response = await notification.deleteNotification(String(offer))
        return res.status(response.code).json(response)
    } catch (err: any) {
        return res.status(err.code ? err.code : 500).json(err)
    }
})

// Update offer
routes.put('/update/:offer_id', async (req: Request, res: Response) => {
    const body = req.body
    const notificationReq: INotification = body
    try {
        const response = await notification.updateNotificacion(notificationReq)
        return res.status(response.code).json(response)
    } catch (err: any) {
        return res.status(err.code ? err.code : 500).json(err)
    }
})


export default routes;