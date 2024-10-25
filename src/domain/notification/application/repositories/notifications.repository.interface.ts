import { Notification } from '../../enterprise/entities/notification.entity'

export interface NotificationsRepository {
  create(notification: Notification): Promise<void>
}
