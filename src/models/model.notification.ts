import mongoose, {Schema} from 'mongoose';

const OfferNotificationSchema: Schema = new Schema({
  notification_type: { type: String, required: true, default: 'offer'},
  sender_id: { type: String, required: true},
  recipient_id: { type: String, required: true},
  offer_id: { type: String, required: true},
  message: { type: String, required: true},
  date_create: { type: Date, default: Date.now},
  date_read: { type: Date},
  is_bidirectional: { type: Boolean, default: true}
}, { collection: 'notificacion'});

export default mongoose.model('Notificacion', OfferNotificationSchema);
