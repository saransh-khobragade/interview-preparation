/**
 * URL Shortener (like bit.ly) - Low Level Design
 * 
 * Requirements:
 * 1. Shorten long URLs
 * 2. Custom aliases
 * 3. URL expiration
 * 4. Click analytics
 * 5. User management
 * 
 * API ENDPOINTS:
 * POST /urls - Create short URL
 * GET /{shortCode} - Redirect to original URL
 * GET /urls/{shortCode} - Get URL details
 * GET /urls/{shortCode}/analytics - Get click analytics
 * GET /users/{userId}/urls - List user URLs
 * PUT /urls/{shortCode} - Update URL
 * DELETE /urls/{shortCode} - Delete URL
 * 
 * DATABASE TABLES:
 * users: id, email, username, password_hash, subscription_type, created_at
 * urls: id, original_url, short_code, custom_alias, user_id, created_at, expires_at, is_active, click_count
 * url_clicks: id, url_id, clicked_at, ip_address, user_agent, referrer, country, device_type
 * daily_url_stats: id, url_id, date, click_count, unique_clicks
 */

// Core Domain Models
interface URL {
  id: string;
  originalUrl: string;
  shortCode: string;
  customAlias?: string;
  createdAt: Date;
  expiresAt?: Date;
  userId?: string;
  isActive: boolean;
}

interface URLAnalytics {
  urlId: string;
  totalClicks: number;
  clickHistory: ClickRecord[];
}

interface ClickRecord {
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  referrer?: string;
}

interface CreateURLRequest {
  originalUrl: string;
  customAlias?: string;
  expirationDays?: number;
  userId?: string;
}

// Repository Pattern
interface URLRepository {
  save(url: URL): Promise<void>;
  findByShortCode(shortCode: string): Promise<URL | null>;
  findByUserId(userId: string): Promise<URL[]>;
  delete(shortCode: string): Promise<void>;
}

interface AnalyticsRepository {
  recordClick(urlId: string, clickData: ClickRecord): Promise<void>;
  getAnalytics(urlId: string): Promise<URLAnalytics>;
}

// Service Layer
interface ShortCodeGenerator {
  generate(originalUrl: string): string;
}

interface URLValidator {
  isValidURL(url: string): boolean;
  isValidAlias(alias: string): boolean;
}

// Implementations
class Base62Generator implements ShortCodeGenerator {
  generate(originalUrl: string): string {
    // Generate base62 short code
    throw new Error('Implementation needed');
  }
}

class URLValidatorImpl implements URLValidator {
  isValidURL(url: string): boolean {
    // Validate URL format
    throw new Error('Implementation needed');
  }

  isValidAlias(alias: string): boolean {
    // Validate custom alias format
    throw new Error('Implementation needed');
  }
}

// Main Service
class URLShortenerService {
  constructor(
    private urlRepo: URLRepository,
    private analyticsRepo: AnalyticsRepository,
    private codeGenerator: ShortCodeGenerator,
    private validator: URLValidator
  ) {}

  async shortenURL(request: CreateURLRequest): Promise<{ shortUrl: string }> {
    // Validate, generate code, save URL
    throw new Error('Implementation needed');
  }

  async expandURL(shortCode: string, clientInfo: Partial<ClickRecord>): Promise<string> {
    // Find URL, validate, record analytics, return original URL
    throw new Error('Implementation needed');
  }

  async getAnalytics(shortCode: string): Promise<URLAnalytics> {
    // Get URL analytics data
    throw new Error('Implementation needed');
  }
}

// Usage Example
// const service = new URLShortenerService(urlRepo, analyticsRepo, generator, validator);

/**
 * Key Design Patterns Used:
 * 1. Repository Pattern - Data access abstraction
 * 2. Strategy Pattern - Different code generation strategies
 * 3. Dependency Injection - Service dependencies
 * 4. Factory Pattern - URL entity creation
 * 
 * Scalability Considerations:
 * - Database sharding by short code
 * - Caching layer (Redis) for hot URLs
 * - Rate limiting per user
 * - Analytics async processing
 */

export { URLShortenerService, type URL, type CreateURLRequest }; 