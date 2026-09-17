export interface Message {
  id: string;
  content: string;
  author?: string;
  createdAt: string;
}

export interface CreateMessageInput {
  content: string;
  author?: string;
}
