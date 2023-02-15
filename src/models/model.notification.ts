import mongoose, {Schema} from 'mongoose';

const OfferNotificationSchema: Schema = new Schema({
  notification_type: { type: String, required: true, default: 'offer'},
  store_id: { type: String, required: true},
  reading_users: { type: Array, required: true},
  offer_id: { type: String, required: true},
  message: { type: String, required: true},
  date_create: { type: Date, default: Date.now}
}, { collection: 'notificacion'});

export default mongoose.model('Notificacion', OfferNotificationSchema);
