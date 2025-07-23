/**
 * Chat System (like WhatsApp/Slack) - Low Level Design
 * 
 * Requirements:
 * 1. Send/receive messages
 * 2. Group chats
 * 3. Online status
 * 4. Message delivery status
 * 5. File sharing
 * 
 * API ENDPOINTS:
 * POST /chats/direct - Create direct chat
 * POST /chats/group - Create group chat
 * GET /users/{userId}/chats - Get user chats
 * GET /chats/{chatId}/messages - Get chat messages
 * POST /chats/{chatId}/messages - Send message
 * PUT /chats/{chatId}/read - Mark messages as read
 * POST /files/upload - Upload file
 * GET /chats/{chatId}/presence - Get online users
 * 
 * WEBSOCKET EVENTS:
 * SEND_MESSAGE, JOIN_CHAT, LEAVE_CHAT, MARK_READ, TYPING
 * NEW_MESSAGE, MESSAGE_STATUS, PRESENCE_UPDATE, USER_TYPING
 * 
 * DATABASE TABLES:
 * users: id, username, email, is_online, last_seen, created_at
 * chats: id, type, name, description, created_at, updated_at
 * chat_participants: id, chat_id, user_id, role, joined_at
 * messages: id, chat_id, sender_id, content, message_type, timestamp, edited_at, reply_to
 * message_status: id, message_id, user_id, status, timestamp
 * files: id, filename, file_size, mime_type, url, chat_id, uploaded_by, uploaded_at
 */

// Core Domain Models
interface User {
  id: string;
  username: string;
  email: string;
  isOnline: boolean;
  lastSeen: Date;
}

interface Chat {
  id: string;
  type: 'DIRECT' | 'GROUP';
  participants: string[]; // user IDs
  createdAt: Date;
  lastMessage?: Message;
}

interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  messageType: 'TEXT' | 'IMAGE' | 'FILE' | 'AUDIO';
  timestamp: Date;
  deliveryStatus: MessageStatus[];
}

interface MessageStatus {
  userId: string;
  status: 'SENT' | 'DELIVERED' | 'READ';
  timestamp: Date;
}

interface GroupChat extends Chat {
  name: string;
  description?: string;
  adminIds: string[];
  maxParticipants: number;
}

// Repository Interfaces
interface UserRepository {
  findById(id: string): Promise<User | null>;
  updateOnlineStatus(userId: string, isOnline: boolean): Promise<void>;
  findByUsername(username: string): Promise<User | null>;
}

interface ChatRepository {
  save(chat: Chat): Promise<void>;
  findById(chatId: string): Promise<Chat | null>;
  findByParticipant(userId: string): Promise<Chat[]>;
}

interface MessageRepository {
  save(message: Message): Promise<void>;
  findByChatId(chatId: string, limit: number, offset: number): Promise<Message[]>;
  updateDeliveryStatus(messageId: string, userId: string, status: string): Promise<void>;
}

// Service Interfaces
interface NotificationService {
  sendPushNotification(userId: string, message: string): Promise<void>;
  sendEmailNotification(email: string, content: string): Promise<void>;
}

interface FileService {
  uploadFile(file: File, userId: string): Promise<string>; // returns file URL
  deleteFile(fileUrl: string): Promise<void>;
}

interface PresenceService {
  setUserOnline(userId: string): Promise<void>;
  setUserOffline(userId: string): Promise<void>;
  getOnlineUsers(userIds: string[]): Promise<string[]>;
}

// WebSocket Connection Manager
interface ConnectionManager {
  addConnection(userId: string, socketId: string): void;
  removeConnection(socketId: string): void;
  getUserConnections(userId: string): string[];
  broadcastToUser(userId: string, message: any): void;
  broadcastToChat(chatId: string, message: any): void;
}

// Main Chat Service
class ChatService {
  constructor(
    private userRepo: UserRepository,
    private chatRepo: ChatRepository,
    private messageRepo: MessageRepository,
    private connectionManager: ConnectionManager,
    private notificationService: NotificationService,
    private fileService: FileService,
    private presenceService: PresenceService
  ) {}

  async sendMessage(senderId: string, chatId: string, content: string, messageType: string = 'TEXT'): Promise<Message> {
    // Validate, create message, broadcast, notify offline users
    throw new Error('Implementation needed');
  }

  async createDirectChat(user1Id: string, user2Id: string): Promise<Chat> {
    // Create direct chat between two users
    throw new Error('Implementation needed');
  }

  async createGroupChat(creatorId: string, name: string, participantIds: string[]): Promise<GroupChat> {
    // Create group chat with participants
    throw new Error('Implementation needed');
  }

  async markMessageAsRead(userId: string, messageId: string): Promise<void> {
    // Update delivery status, notify sender
    throw new Error('Implementation needed');
  }

  async getUserChats(userId: string): Promise<Chat[]> {
    // Get all chats for user
    throw new Error('Implementation needed');
  }

  async getChatMessages(chatId: string, limit: number = 50, offset: number = 0): Promise<Message[]> {
    // Get paginated chat messages
    throw new Error('Implementation needed');
  }

  async handleUserConnect(userId: string, socketId: string): Promise<void> {
    // Handle user connection, update presence, broadcast status
    throw new Error('Implementation needed');
  }

  async handleUserDisconnect(socketId: string, userId: string): Promise<void> {
    // Handle user disconnection, update presence if no other connections
    throw new Error('Implementation needed');
  }
}

// WebSocket Event Handlers
class ChatWebSocketHandler {
  constructor(private chatService: ChatService) {}

  async handleConnection(socket: any, userId: string): Promise<void> {
    // Set up socket event handlers for chat operations
    throw new Error('Implementation needed');
  }
}

/**
 * Key Design Patterns Used:
 * 1. Repository Pattern - Data access abstraction
 * 2. Observer Pattern - Real-time message broadcasting
 * 3. Strategy Pattern - Different notification strategies
 * 4. Command Pattern - Message handling
 * 
 * Scalability Considerations:
 * - Database sharding by chat ID
 * - Message queue for offline notifications
 * - Redis for presence management
 * - CDN for file storage
 * - WebSocket connection pools
 */

export { ChatService, ChatWebSocketHandler, type Chat, type Message, type User }; 