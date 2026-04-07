interface NotificationItem {
  avatar: string;
  date: string;
  isRead?: boolean;
  message: string;
  title: string;
  userId: number | string;
  messageId?: number | string;
}

export type { NotificationItem };
