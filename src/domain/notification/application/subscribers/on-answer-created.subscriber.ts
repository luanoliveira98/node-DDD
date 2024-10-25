import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler.interface";
import { AnswerCreatedEvent } from "@/domain/forum/events/answer-created.event";

export class OnAnswerCreatedSubscriber implements EventHandler {
  constructor() {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.sendNewAnswerNotification.bind(this), AnswerCreatedEvent.name);
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    console.log(answer)
  }
}