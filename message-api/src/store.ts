import { randomUUID } from 'node:crypto';
import { CreateMessageInput, Message } from './types';

/**
 * In-memory storage for messages. Data is lost on restart by design
 * (see README) — swap this class for a database-backed implementation
 * if persistence is ever needed, without touching the routes.
 */
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

// Single shared instance used across the app.
export const messageStore = new MessageStore();
