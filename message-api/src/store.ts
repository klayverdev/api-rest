import { randomUUID } from 'node:crypto';
import { CreateMessageInput, Message } from './types';


class MessageStore {
  private readonly messages = new Map<string, Message>();

  create(input: CreateMessageInput): Message {
    const message: Message = {
      id: randomUUID(),
      content: input.content,
      author: input.author,
      createdAt: new Date().toISOString(),
    };

    this.messages.set(message.id, message);
    return message;
  }

  findById(id: string): Message | undefined {
    return this.messages.get(id);
  }

  delete(id: string): boolean {
    return this.messages.delete(id);
  }
}

export const messageStore = new MessageStore();
