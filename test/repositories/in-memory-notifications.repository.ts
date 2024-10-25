import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications.repository.interface'
import { Notification } from '@/domain/notification/enterprise/entities/notification.entity'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)
  }
}
