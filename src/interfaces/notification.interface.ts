import {Types} from "mongoose";

export default interface INotification {
    notification_type: String,
    store_id: String,
    reading_users?: Array<string>,
    offer_id: Number,
    message: String,
    createdDate?: Date,
    createdUser?: Types.ObjectId
}