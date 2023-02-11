export default interface INotification{
  notification_type: string,
  sender_id: String,
  recipient_id: String,
  offer_id: String,
  message: String,
  date_create: Date, 
  date_read: Date,
  is_bidirectional: Boolean
}