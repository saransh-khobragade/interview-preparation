/**
 * Social Media Platform (like Twitter/Instagram) - Low Level Design
 * 
 * Requirements:
 * 1. User posts and feeds
 * 2. Follow/unfollow users
 * 3. Like and comment on posts
 * 4. News feed generation
 * 5. Notifications
 * 
 * API ENDPOINTS:
 * POST /posts - Create post
 * GET /posts/{postId} - Get post details
 * GET /users/{userId}/feed - Get user feed
 * POST /posts/{postId}/like - Like post
 * POST /posts/{postId}/comments - Add comment
 * POST /users/{userId}/follow - Follow user
 * GET /users/{userId}/followers - Get followers
 * GET /users/{userId}/following - Get following
 * 
 * DATABASE TABLES:
 * users: id, username, email, display_name, bio, profile_picture, is_verified, created_at
 * posts: id, author_id, content, image_urls, created_at, likes_count, comments_count
 * comments: id, post_id, author_id, content, created_at, likes_count
 * likes: id, user_id, post_id, comment_id, created_at
 * follows: id, follower_id, followee_id, created_at
 * feed_cache: id, user_id, post_id, score, created_at
 */

// Core Domain Models
interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  bio?: string;
  profilePicture?: string;
  isVerified: boolean;
  createdAt: Date;
}

interface Post {
  id: string;
  authorId: string;
  content: string;
  imageUrls: string[];
  createdAt: Date;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
}

interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  likesCount: number;
}

interface Follow {
  followerId: string;
  followeeId: string;
  createdAt: Date;
}

interface Like {
  userId: string;
  postId?: string;
  commentId?: string;
  createdAt: Date;
}

interface FeedItem {
  post: Post;
  author: User;
  isLiked: boolean;
  totalLikes: number;
  recentComments: Comment[];
}

// Repository Interfaces
interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
}

interface PostRepository {
  save(post: Post): Promise<void>;
  findById(id: string): Promise<Post | null>;
  findByAuthor(authorId: string): Promise<Post[]>;
  findByAuthors(authorIds: string[]): Promise<Post[]>;
}

interface FollowRepository {
  save(follow: Follow): Promise<void>;
  remove(followerId: string, followeeId: string): Promise<void>;
  findFollowers(userId: string): Promise<string[]>;
  findFollowing(userId: string): Promise<string[]>;
  isFollowing(followerId: string, followeeId: string): Promise<boolean>;
}

interface LikeRepository {
  save(like: Like): Promise<void>;
  remove(like: Like): Promise<void>;
  findPostLikes(postId: string): Promise<Like[]>;
  hasUserLikedPost(userId: string, postId: string): Promise<boolean>;
}

// Service Interfaces
interface FeedGenerationStrategy {
  generateFeed(userId: string, limit: number): Promise<FeedItem[]>;
}

interface NotificationService {
  notifyNewFollower(userId: string, followerId: string): Promise<void>;
  notifyPostLike(postAuthorId: string, likerId: string, postId: string): Promise<void>;
  notifyNewComment(postAuthorId: string, commenterId: string, postId: string): Promise<void>;
}

interface ContentModerationService {
  isContentAllowed(content: string): Promise<boolean>;
  flagInappropriateContent(postId: string): Promise<void>;
}

// Strategy Pattern for Feed Generation
class ChronologicalFeedStrategy implements FeedGenerationStrategy {
  constructor(
    private postRepo: PostRepository,
    private followRepo: FollowRepository,
    private userRepo: UserRepository,
    private likeRepo: LikeRepository
  ) {}

  async generateFeed(userId: string, limit: number): Promise<FeedItem[]> {
    // Get following users, fetch their posts, sort by time
    throw new Error('Implementation needed');
  }
}

class AlgorithmicFeedStrategy implements FeedGenerationStrategy {
  async generateFeed(userId: string, limit: number): Promise<FeedItem[]> {
    // ML-based feed ranking by engagement, interests, etc.
    throw new Error('Implementation needed');
  }
}

// Main Social Media Service
class SocialMediaService {
  constructor(
    private userRepo: UserRepository,
    private postRepo: PostRepository,
    private followRepo: FollowRepository,
    private likeRepo: LikeRepository,
    private feedStrategy: FeedGenerationStrategy,
    private notificationService: NotificationService,
    private moderationService: ContentModerationService
  ) {}

  async createPost(authorId: string, content: string, imageUrls: string[]): Promise<Post> {
    // Validate content, create post, notify followers
    throw new Error('Implementation needed');
  }

  async likePost(userId: string, postId: string): Promise<void> {
    // Add like, update counts, notify author
    throw new Error('Implementation needed');
  }

  async followUser(followerId: string, followeeId: string): Promise<void> {
    // Create follow relationship, notify user
    throw new Error('Implementation needed');
  }

  async getFeed(userId: string, limit: number = 20): Promise<FeedItem[]> {
    // Generate user feed using strategy
    throw new Error('Implementation needed');
  }

  async getUserProfile(userId: string): Promise<{ user: User; postCount: number; followerCount: number; followingCount: number }> {
    // Aggregate user stats
    throw new Error('Implementation needed');
  }
}

/**
 * Key Design Patterns Used:
 * 1. Strategy Pattern - Different feed generation algorithms
 * 2. Repository Pattern - Data access abstraction
 * 3. Observer Pattern - Notification system
 * 4. Factory Pattern - Feed item creation
 * 
 * Scalability Considerations:
 * - Database sharding by user ID
 * - Caching for hot user data and feeds
 * - Message queues for notifications
 * - CDN for media content
 */

export { 
  SocialMediaService,
  ChronologicalFeedStrategy,
  AlgorithmicFeedStrategy,
  type User,
  type Post,
  type FeedItem
}; 