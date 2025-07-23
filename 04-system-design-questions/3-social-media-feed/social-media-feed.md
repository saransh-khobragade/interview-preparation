# Design a Social Media Feed (Twitter/Instagram)

## 📋 **Requirements**

### **Functional Requirements**
- Users can post content (text, images, videos)
- Users can follow other users
- Generate personalized news feed
- Like, comment, and share posts
- Real-time notifications
- Trending topics and hashtags
- Search functionality

### **Non-Functional Requirements**
- **Scale:** 500M daily active users, 100M posts per day
- **Feed Generation:** < 200ms for timeline loading
- **Availability:** 99.9% uptime
- **Consistency:** Eventually consistent for feed updates
- **Storage:** Handle media content (images, videos)

## 🎯 **Capacity Estimation**

### **User Activity**
- **Daily Active Users:** 500M
- **Posts per Day:** 100M posts
- **Feed Requests:** 500M users × 10 requests/day = 5B requests/day
- **Peak QPS:** 5B / (24 × 3600) × 3 = ~175K QPS

### **Storage Requirements**
- **Text Posts:** 100M × 200 bytes = 20GB/day
- **Media Posts:** 30% with media, avg 2MB = 30M × 2MB = 60TB/day
- **Total Storage:** ~60TB/day, ~22PB/year

### **Feed Generation**
- **Fan-out Writes:** Each post to average 100 followers = 10B feed insertions/day
- **Timeline Cache:** Top 1000 posts per user = 500M × 1000 × 1KB = 500TB

## 🏗️ **High-Level Architecture**

The social media feed system uses a hybrid push-pull model for feed generation with separate services for content creation, feed generation, and content delivery.

## 📊 **Database Design**

### **User Service Database**
```sql
users: user_id, username, email, bio, profile_image, verified, created_at
user_relationships: follower_id, followee_id, relationship_type, created_at
user_settings: user_id, privacy_level, notification_preferences
```

### **Content Service Database**
```sql
posts: post_id, user_id, content_type, text_content, media_urls, created_at, updated_at
post_metadata: post_id, like_count, comment_count, share_count, view_count
hashtags: tag_id, tag_name, post_count, trending_score
post_hashtags: post_id, tag_id
```

### **Engagement Database**
```sql
likes: like_id, post_id, user_id, created_at
comments: comment_id, post_id, user_id, content, parent_comment_id, created_at
shares: share_id, post_id, user_id, shared_to, created_at
```

### **Feed Database**
```sql
user_feeds: user_id, post_id, score, created_at, feed_type (home/trending)
notifications: notification_id, user_id, type, content, is_read, created_at
```

## 🔌 **API Design**

### **Content APIs**
```
POST /api/v1/posts - Create new post
GET /api/v1/posts/{post_id} - Get specific post
PUT /api/v1/posts/{post_id} - Update post
DELETE /api/v1/posts/{post_id} - Delete post
POST /api/v1/posts/{post_id}/like - Like/unlike post
POST /api/v1/posts/{post_id}/comment - Add comment
```

### **Feed APIs**
```
GET /api/v1/feeds/home?page={page} - Get personalized home feed
GET /api/v1/feeds/trending - Get trending posts
GET /api/v1/feeds/user/{user_id} - Get user's posts
GET /api/v1/search/posts?q={query} - Search posts
GET /api/v1/hashtags/trending - Get trending hashtags
```

### **Social APIs**
```
POST /api/v1/users/{user_id}/follow - Follow user
DELETE /api/v1/users/{user_id}/follow - Unfollow user
GET /api/v1/users/{user_id}/followers - Get followers
GET /api/v1/users/{user_id}/following - Get following list
```

## ⚡ **Technology Stack**

### **Application Layer**
- **API Gateway:** Kong, AWS API Gateway
- **Microservices:** Java Spring Boot, Go, Node.js
- **Load Balancer:** NGINX, AWS Application Load Balancer

### **Feed Generation**
- **Message Queue:** Apache Kafka for fan-out operations
- **Stream Processing:** Apache Storm, Kafka Streams
- **Batch Processing:** Apache Spark for analytics

### **Databases**
- **User Data:** PostgreSQL with read replicas
- **Feed Storage:** Redis for active feeds, Cassandra for historical
- **Media Metadata:** MongoDB for flexible schema
- **Search:** Elasticsearch for content search
- **Cache:** Redis for hot data, Memcached for session data

### **Storage & CDN**
- **Media Storage:** AWS S3, Google Cloud Storage
- **CDN:** CloudFront, CloudFlare for global content delivery
- **Image Processing:** AWS Lambda for thumbnail generation

## 📰 **Feed Generation Strategies**

### **Push Model (Fan-out on Write)**
- **Process:** When user posts, immediately push to all followers' feeds
- **Pros:** Fast read times, real-time updates
- **Cons:** High write amplification for celebrities
- **Use Case:** Regular users with < 10K followers

### **Pull Model (Fan-out on Read)**
- **Process:** Generate feed when user requests timeline
- **Pros:** No write amplification, always fresh content
- **Cons:** High read latency, complex caching
- **Use Case:** Celebrity accounts with millions of followers

### **Hybrid Model**
- **Push for Regular Users:** Fan-out posts to followers with < 10K followers
- **Pull for Celebrities:** Fetch celebrity posts during timeline generation
- **Mixed Timeline:** Merge pushed posts with pulled celebrity content
- **Optimization:** Pre-compute feeds for active users

## 🔄 **Feed Generation Flow**

### **Post Creation Flow**
1. **User creates post** → Content Service validates and stores
2. **Post metadata** extracted (hashtags, mentions, media info)
3. **Media processing** (thumbnail generation, compression)
4. **Fan-out decision** based on user's follower count
5. **Push to followers** (if < 10K followers) via message queue
6. **Update search index** with new content
7. **Trigger notifications** for mentions and hashtags

### **Timeline Generation Flow**
1. **User requests feed** → Check cache for pre-computed timeline
2. **Cache miss** → Fetch from multiple sources:
   - **Pushed posts** from Redis/Cassandra
   - **Celebrity posts** from recent posts service
   - **Trending content** from trending service
3. **Ranking algorithm** applies user preferences and engagement signals
4. **Personalized timeline** returned to user
5. **Cache timeline** for subsequent requests

## 🎯 **Content Ranking Algorithm**

### **Ranking Signals**
- **Recency:** Newer posts weighted higher
- **Engagement:** Like, comment, share counts
- **User Relationship:** Closer relationships weighted higher
- **Content Type:** User preferences for media vs text
- **Interaction History:** Previous user engagement patterns

### **Machine Learning Features**
- **User Features:** Age, location, interests, activity patterns
- **Content Features:** Post type, hashtags, media quality, text sentiment
- **Interaction Features:** Historical user-content interactions
- **Contextual Features:** Time of day, device type, location

### **Ranking Model**
- **Learning to Rank:** LambdaMART or neural ranking models
- **Feature Engineering:** Combine signals into feature vectors
- **A/B Testing:** Continuous experimentation with ranking variations
- **Real-time Updates:** Online learning for personalization

## 🚀 **Scalability Solutions**

### **Database Scaling**
- **Read Replicas:** Multiple read replicas for feed queries
- **Sharding:** Partition by user_id for user data, post_id for content
- **Denormalization:** Pre-compute frequently accessed data
- **Caching Layers:** Multi-level caching (L1: Application, L2: Redis)

### **Feed Storage Optimization**
- **Hot Feed:** Last 1000 posts per user in Redis
- **Warm Feed:** Recent posts in Cassandra with SSD storage
- **Cold Feed:** Historical posts in Cassandra with HDD storage
- **TTL Policies:** Automatic cleanup of old feed entries

### **Content Delivery**
- **CDN Distribution:** Global CDN for media content
- **Image Optimization:** Multiple sizes, WebP/AVIF formats
- **Lazy Loading:** Load images as user scrolls
- **Progressive Enhancement:** Low-quality placeholders first

## 🔍 **Search & Discovery**

### **Content Search**
- **Elasticsearch Cluster:** Full-text search across posts
- **Search Indexing:** Real-time indexing of new posts
- **Faceted Search:** Filter by user, date, content type, location
- **Autocomplete:** Trie-based suggestions for users and hashtags

### **Trending Algorithm**
- **Hashtag Trending:** Volume increase over time window
- **Geographic Trends:** Location-based trending topics
- **Personalized Trends:** User interest-based trending content
- **Real-time Processing:** Stream processing for trending detection

### **Recommendation System**
- **Content-Based:** Similar posts based on content features
- **Collaborative Filtering:** Users with similar interests
- **Social Signals:** Posts liked by friends and followed users
- **Explore Page:** Diverse content discovery feed

## 🚨 **Potential Bottlenecks & Solutions**

### **Feed Generation Latency**
- **Problem:** Slow timeline generation for users with many follows
- **Solution:** Pre-compute feeds, async processing, intelligent caching

### **Celebrity User Fan-out**
- **Problem:** Posting by celebrities causes massive write amplification
- **Solution:** Pull model for celebrities, hybrid approach

### **Hot Partition Problem**
- **Problem:** Popular posts creating database hotspots
- **Solution:** Consistent hashing, read replicas, caching

### **Real-time Updates**
- **Problem:** Feed updates not appearing in real-time
- **Solution:** WebSocket connections, push notifications, polling optimization

## 🔍 **Monitoring & Analytics**

### **User Engagement Metrics**
- **Time on Feed:** Average session duration
- **Engagement Rate:** Likes, comments, shares per post viewed
- **Content Consumption:** Posts viewed vs posts in feed
- **User Retention:** Daily, weekly, monthly active users

### **System Performance**
- **Feed Load Time:** p95 timeline generation latency
- **Cache Hit Ratio:** Feed cache effectiveness
- **Database Performance:** Query latency and throughput
- **CDN Performance:** Media delivery speed globally

### **Content Quality**
- **Spam Detection:** Automated content moderation metrics
- **User Reports:** Content flagging and resolution rates
- **Trending Accuracy:** Quality of trending topic detection
- **Recommendation CTR:** Click-through rate on suggested content

## 🔒 **Content Moderation & Safety**

### **Automated Moderation**
- **Text Analysis:** NLP for hate speech and spam detection
- **Image Recognition:** AI-based inappropriate content detection
- **Behavior Analysis:** Anomaly detection for suspicious accounts
- **Real-time Filtering:** Block content before it reaches feeds

### **Human Moderation**
- **Review Queue:** Flagged content for human review
- **Escalation Process:** Complex cases requiring expert review
- **Community Guidelines:** Clear policies and enforcement
- **Appeals Process:** Users can appeal moderation decisions 