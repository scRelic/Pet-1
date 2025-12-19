export interface INotification {
  id: string | number;
  user_id: number;
  message: string;
  is_read: boolean;
  created_at: string;
}
