/**
 * Notification Service (like Firebase/SendGrid) - Low Level Design
 * 
 * Requirements:
 * 1. Multiple notification channels (email, SMS, push)
 * 2. Template management
 * 3. User preferences
 * 4. Delivery tracking
 * 5. Rate limiting
 * 
 * API ENDPOINTS:
 * POST /notifications/send - Send notification
 * POST /notifications/bulk - Send bulk notifications
 * GET /notifications/{notificationId}/status - Get delivery status
 * POST /templates - Create template
 * GET /templates/{templateId} - Get template
 * PUT /users/{userId}/preferences - Update user preferences
 * GET /notifications/{notificationId}/analytics - Get notification analytics
 * 
 * DATABASE TABLES:
 * notifications: id, user_id, type, channel, subject, content, template_id, status, created_at
 * templates: id, name, type, subject, body_template, variables, is_active
 * user_preferences: id, user_id, channel, type, is_enabled, frequency
 * delivery_results: id, notification_id, channel, status, attempt_count, last_attempt_at, error_message
 * rate_limits: id, user_id, channel, request_count, window_start
 */

// Core Domain Models
interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  channel: NotificationChannel;
  subject: string;
  content: string;
  templateId?: string;
  scheduledAt?: Date;
  sentAt?: Date;
  status: NotificationStatus;
  metadata: Record<string, any>;
}

interface NotificationTemplate {
  id: string;
  name: string;
  type: NotificationType;
  subject: string;
  bodyTemplate: string;
  variables: string[];
  isActive: boolean;
}

interface UserPreference {
  userId: string;
  channel: NotificationChannel;
  type: NotificationType;
  isEnabled: boolean;
  frequency: NotificationFrequency;
}

interface DeliveryResult {
  notificationId: string;
  channel: NotificationChannel;
  status: DeliveryStatus;
  attemptCount: number;
  lastAttemptAt: Date;
  errorMessage?: string;
  externalId?: string;
}

enum NotificationType {
  WELCOME = 'WELCOME',
  ORDER_CONFIRMATION = 'ORDER_CONFIRMATION',
  PAYMENT_REMINDER = 'PAYMENT_REMINDER',
  SECURITY_ALERT = 'SECURITY_ALERT',
  PROMOTIONAL = 'PROMOTIONAL',
  SYSTEM_UPDATE = 'SYSTEM_UPDATE'
}

enum NotificationChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
  IN_APP = 'IN_APP'
}

enum NotificationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

enum NotificationFrequency {
  IMMEDIATE = 'IMMEDIATE',
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY'
}

enum DeliveryStatus {
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  BOUNCED = 'BOUNCED',
  OPENED = 'OPENED',
  CLICKED = 'CLICKED'
}

// Repository Interfaces
interface NotificationRepository {
  save(notification: Notification): Promise<void>;
  findById(id: string): Promise<Notification | null>;
  findPendingNotifications(): Promise<Notification[]>;
  updateStatus(id: string, status: NotificationStatus): Promise<void>;
}

interface TemplateRepository {
  findById(id: string): Promise<NotificationTemplate | null>;
  findByType(type: NotificationType): Promise<NotificationTemplate[]>;
  save(template: NotificationTemplate): Promise<void>;
}

interface UserPreferenceRepository {
  findByUserId(userId: string): Promise<UserPreference[]>;
  save(preference: UserPreference): Promise<void>;
  isChannelEnabled(userId: string, channel: NotificationChannel, type: NotificationType): Promise<boolean>;
}

interface DeliveryRepository {
  save(result: DeliveryResult): Promise<void>;
  findByNotificationId(notificationId: string): Promise<DeliveryResult[]>;
  updateStatus(notificationId: string, status: DeliveryStatus): Promise<void>;
}

// Service Interfaces
interface NotificationChannelProvider {
  send(notification: Notification): Promise<DeliveryResult>;
  supports(channel: NotificationChannel): boolean;
}

interface TemplateEngine {
  render(template: NotificationTemplate, variables: Record<string, any>): Promise<{ subject: string; content: string }>;
}

interface RateLimiter {
  isAllowed(userId: string, channel: NotificationChannel): Promise<boolean>;
  recordSent(userId: string, channel: NotificationChannel): Promise<void>;
}

// Strategy Pattern for Notification Channels
class EmailNotificationChannel implements NotificationChannelProvider {
  constructor(private emailProvider: any) {}

  async send(notification: Notification): Promise<DeliveryResult> {
    // Send email via provider (SendGrid, AWS SES, etc.)
    throw new Error('Implementation needed');
  }

  supports(channel: NotificationChannel): boolean {
    // Check if channel is email
    throw new Error('Implementation needed');
  }
}

class SMSNotificationChannel implements NotificationChannelProvider {
  constructor(private smsProvider: any) {}

  async send(notification: Notification): Promise<DeliveryResult> {
    // Send SMS via provider (Twilio, AWS SNS, etc.)
    throw new Error('Implementation needed');
  }

  supports(channel: NotificationChannel): boolean {
    // Check if channel is SMS
    throw new Error('Implementation needed');
  }
}

class PushNotificationChannel implements NotificationChannelProvider {
  constructor(private pushProvider: any) {}

  async send(notification: Notification): Promise<DeliveryResult> {
    // Send push notification via provider (FCM, APNS, etc.)
    throw new Error('Implementation needed');
  }

  supports(channel: NotificationChannel): boolean {
    // Check if channel is push
    throw new Error('Implementation needed');
  }
}

// Template Engine Implementation
class HandlebarsTemplateEngine implements TemplateEngine {
  async render(template: NotificationTemplate, variables: Record<string, any>): Promise<{ subject: string; content: string }> {
    // Render template with variables using Handlebars
    throw new Error('Implementation needed');
  }
}

// Rate Limiter Implementation
class TokenBucketRateLimiter implements RateLimiter {
  private buckets = new Map<string, { tokens: number; lastRefill: number }>();

  async isAllowed(userId: string, channel: NotificationChannel): Promise<boolean> {
    // Check rate limit using token bucket algorithm
    throw new Error('Implementation needed');
  }

  async recordSent(userId: string, channel: NotificationChannel): Promise<void> {
    // Record sent notification for rate limiting
    throw new Error('Implementation needed');
  }
}

// Main Notification Service
class NotificationService {
  private channels: NotificationChannelProvider[] = [];

  constructor(
    private notificationRepo: NotificationRepository,
    private templateRepo: TemplateRepository,
    private preferenceRepo: UserPreferenceRepository,
    private deliveryRepo: DeliveryRepository,
    private templateEngine: TemplateEngine,
    private rateLimiter: RateLimiter
  ) {}

  addChannel(channel: NotificationChannelProvider): void {
    this.channels.push(channel);
  }

  async sendNotification(request: {
    userId: string;
    type: NotificationType;
    channel: NotificationChannel;
    templateId?: string;
    variables?: Record<string, any>;
    scheduledAt?: Date;
  }): Promise<string> {
    // Create notification, check preferences, send
    throw new Error('Implementation needed');
  }

  async sendBulkNotification(userIds: string[], type: NotificationType, templateId: string, variables: Record<string, any>): Promise<void> {
    // Send notification to multiple users
    throw new Error('Implementation needed');
  }

  async retryFailedNotifications(): Promise<void> {
    // Retry failed notifications with exponential backoff
    throw new Error('Implementation needed');
  }

  async updateUserPreferences(userId: string, preferences: UserPreference[]): Promise<void> {
    // Update user notification preferences
    throw new Error('Implementation needed');
  }

  async getDeliveryStatus(notificationId: string): Promise<DeliveryResult[]> {
    // Get notification delivery status
    throw new Error('Implementation needed');
  }

  async trackDeliveryEvent(notificationId: string, status: DeliveryStatus): Promise<void> {
    // Track delivery events (opened, clicked, etc.)
    throw new Error('Implementation needed');
  }
}

// Background Job Processor
class NotificationProcessor {
  constructor(private notificationService: NotificationService) {}

  async processPendingNotifications(): Promise<void> {
    // Process notifications scheduled for delivery
    throw new Error('Implementation needed');
  }

  async processRetries(): Promise<void> {
    // Process failed notifications for retry
    throw new Error('Implementation needed');
  }
}

/**
 * Key Design Patterns Used:
 * 1. Strategy Pattern - Different notification channels
 * 2. Template Method Pattern - Notification processing
 * 3. Observer Pattern - Delivery status tracking
 * 4. Factory Pattern - Channel creation
 * 
 * Scalability Considerations:
 * - Message queues for async processing
 * - Database partitioning by time/user
 * - Circuit breaker for external providers
 * - Caching for templates and preferences
 * - Rate limiting per user/channel
 */

export { 
  NotificationService,
  NotificationProcessor,
  EmailNotificationChannel,
  SMSNotificationChannel,
  PushNotificationChannel,
  HandlebarsTemplateEngine,
  TokenBucketRateLimiter,
  type Notification,
  type NotificationTemplate,
  NotificationType,
  NotificationChannel,
  NotificationStatus
}; 