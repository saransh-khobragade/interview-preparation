# Design Twitter Microblogging Platform

## 📋 **Requirements**

### **Functional Requirements**
- Users can post tweets (text, images, videos) up to 280 characters
- Users can follow other users and see their tweets
- Timeline generation (home timeline, user timeline)
- Tweet interactions (like, retweet, reply, quote tweet)
- Real-time notifications for mentions, likes, follows
- Trending topics and hashtag discovery
- Search functionality for tweets, users, hashtags
- Direct messaging between users

### **Non-Functional Requirements**
- **Scale:** 500M daily active users, 500M tweets per day
- **Timeline Latency:** < 200ms for home timeline generation
- **Tweet Posting:** < 100ms for tweet creation
- **Availability:** 99.9% uptime
- **Consistency:** Eventually consistent for timeline, strongly consistent for user data
- **Global:** Support for multiple languages and regions

## 🎯 **Capacity Estimation**

### **User Activity**
- **Daily Active Users:** 500M
- **Tweets per Day:** 500M tweets (~5,800 tweets/second)
- **Timeline Requests:** 500M users × 20 requests/day = 10B requests/day (~115K QPS)
- **Peak Traffic:** 3x average = 345K QPS during major events

### **Storage Requirements**
- **Tweet Storage:** 500M tweets/day × 300 bytes = 150GB/day
- **Media Content:** 20% tweets with media, avg 2MB = 100M × 2MB = 200TB/day
- **User Data:** 500M users × 1KB = 500GB
- **Total Daily Storage:** ~200TB/day

### **Timeline Generation**
- **Fan-out Writes:** Average 100 followers per user = 50B timeline insertions/day
- **Cache Storage:** Top 800 tweets per user = 500M × 800 × 500 bytes = 200TB

## 🏗️ **High-Level Architecture**

The Twitter system uses a hybrid push-pull model for timeline generation with separate microservices for tweet creation, timeline generation, and real-time notifications.

## 📊 **Database Design**

### **User Service Database**
```sql
users: user_id, username, email, display_name, bio, profile_image, verified, created_at, follower_count, following_count
user_relationships: follower_id, followee_id, created_at, relationship_type (follow/block/mute)
user_settings: user_id, privacy_public, notification_preferences, language, timezone
```

### **Tweet Service Database**
```sql
tweets: tweet_id, user_id, content, media_urls, reply_to_tweet_id, retweet_of_tweet_id, created_at, is_deleted
tweet_metrics: tweet_id, like_count, retweet_count, reply_count, view_count, updated_at
hashtags: hashtag_id, hashtag_text, tweet_count, trending_score
tweet_hashtags: tweet_id, hashtag_id
user_mentions: tweet_id, mentioned_user_id
```

### **Engagement Database**
```sql
likes: like_id, user_id, tweet_id, created_at
retweets: retweet_id, user_id, original_tweet_id, retweet_tweet_id, created_at
replies: reply_id, user_id, original_tweet_id, reply_tweet_id, created_at
```

### **Timeline Database**
```sql
home_timeline: user_id, tweet_id, score, inserted_at
user_timeline: user_id, tweet_id, created_at
notifications: notification_id, user_id, type, actor_user_id, tweet_id, created_at, is_read
```

## 🔌 **API Design**

### **Tweet APIs**
```
POST /api/v1/tweets - Create new tweet
GET /api/v1/tweets/{tweet_id} - Get specific tweet
DELETE /api/v1/tweets/{tweet_id} - Delete tweet
POST /api/v1/tweets/{tweet_id}/like - Like/unlike tweet
POST /api/v1/tweets/{tweet_id}/retweet - Retweet/unretweet
POST /api/v1/tweets/{tweet_id}/reply - Reply to tweet
```

### **Timeline APIs**
```
GET /api/v1/timeline/home?cursor={cursor} - Get home timeline
GET /api/v1/timeline/user/{user_id}?cursor={cursor} - Get user timeline
GET /api/v1/timeline/mentions?cursor={cursor} - Get mentions timeline
GET /api/v1/search/tweets?q={query}&type=recent - Search tweets
GET /api/v1/trending/hashtags?location={location} - Get trending topics
```

### **User APIs**
```
POST /api/v1/users/{user_id}/follow - Follow user
DELETE /api/v1/users/{user_id}/follow - Unfollow user
GET /api/v1/users/{user_id}/followers - Get followers list
GET /api/v1/users/{user_id}/following - Get following list
GET /api/v1/users/search?q={query} - Search users
```

### **Real-time Events (WebSocket/Server-Sent Events)**
```
// Real-time notifications
new_tweet: {tweet_id, user_id, content, timestamp}
new_like: {tweet_id, user_id, timestamp}
new_follow: {follower_id, followee_id, timestamp}
new_mention: {tweet_id, mentioned_user_id, timestamp}
trending_update: {hashtags, location, timestamp}
```

## ⚡ **Technology Stack**

### **Application Layer**
- **API Gateway:** Kong, AWS API Gateway with rate limiting
- **Load Balancer:** NGINX, AWS Application Load Balancer
- **Microservices:** Java Spring Boot, Go for high-performance services

### **Real-time Processing**
- **Message Queue:** Apache Kafka for event streaming
- **Stream Processing:** Apache Storm, Kafka Streams for real-time analytics
- **WebSocket Service:** Node.js for real-time notifications

### **Databases**
- **User Data:** PostgreSQL with read replicas
- **Tweet Storage:** Cassandra for high write throughput
- **Timeline Cache:** Redis Cluster for hot timelines
- **Search:** Elasticsearch for tweet and user search
- **Analytics:** ClickHouse for metrics and analytics

### **Caching & Storage**
- **Cache:** Redis for hot data, Memcached for session data
- **Media Storage:** AWS S3 for images and videos
- **CDN:** CloudFront for global media delivery

## 📱 **Timeline Generation Strategy**

### **Hybrid Push-Pull Model**

#### **Push Model (Fan-out on Write)**
- **Target:** Users with < 5K followers (99% of users)
- **Process:** When user tweets, immediately insert into followers' timelines
- **Storage:** Pre-computed timelines in Redis/Cassandra
- **Benefits:** Fast timeline reads, real-time updates

#### **Pull Model (Fan-out on Read)**
- **Target:** Celebrity users with > 5K followers
- **Process:** Fetch recent tweets when user requests timeline
- **Benefits:** No write amplification for viral content
- **Challenges:** Higher read latency, more complex caching

#### **Hybrid Timeline Generation**
1. **Base Timeline:** Pre-computed from push model (followed users < 5K followers)
2. **Celebrity Content:** Fetch recent tweets from followed celebrities
3. **Promoted Content:** Inject ads and promoted tweets
4. **Ranking:** Apply ML ranking algorithm
5. **Final Timeline:** Merge and rank all content sources

## 🔄 **Tweet Posting Flow**

### **Tweet Creation Pipeline**
1. **User posts tweet** → Tweet Service validates content and rate limits
2. **Content processing** → Extract hashtags, mentions, URLs
3. **Media processing** → Upload images/videos to S3, generate thumbnails
4. **Store tweet** → Save to Cassandra with unique tweet_id
5. **Fan-out decision** → Check user's follower count
6. **Timeline insertion** → Push to followers' timelines (if < 5K followers)
7. **Index for search** → Add to Elasticsearch index
8. **Real-time notifications** → Notify mentioned users via WebSocket
9. **Analytics events** → Send events to Kafka for trending calculation

### **Timeline Delivery**
1. **User requests timeline** → Check Redis cache first
2. **Cache hit** → Return cached timeline
3. **Cache miss** → Generate timeline:
   - Fetch base timeline (push model data)
   - Fetch celebrity tweets (pull model)
   - Apply ranking algorithm
   - Cache result in Redis
4. **Return paginated timeline** → Send to client with cursor for pagination

## 🎯 **Trending Topics Algorithm**

### **Real-time Trending Detection**
- **Hashtag Volume:** Track hashtag usage over time windows
- **Velocity Calculation:** Compare current volume vs historical average
- **Geographic Trends:** Calculate trends per country/city
- **Spam Filtering:** Remove bot-generated hashtags
- **Manual Curation:** Human oversight for sensitive topics

### **Trending Score Calculation**
```
Trending Score = (Current Volume - Average Volume) / Average Volume × Decay Factor × Geographic Weight
```

### **Implementation**
- **Stream Processing:** Kafka Streams process hashtag events in real-time
- **Time Windows:** Calculate trends over 5min, 15min, 1hour windows
- **Storage:** Store trending data in Redis with TTL
- **Updates:** Refresh trending topics every 5 minutes

## 🔍 **Search System**

### **Tweet Search**
- **Elasticsearch Cluster:** Index all public tweets
- **Real-time Indexing:** Index new tweets within seconds
- **Search Features:**
  - Full-text search with relevance ranking
  - Filter by date, user, location, media type
  - Autocomplete for hashtags and users
  - Advanced queries with boolean operators

### **Search Ranking Factors**
- **Recency:** Newer tweets ranked higher
- **Engagement:** Likes, retweets, replies count
- **User Authority:** Verified users, follower count
- **Relevance:** Query match quality
- **Social Signals:** Tweets from followed users

## 🚀 **Scalability Solutions**

### **Database Scaling**
- **Tweet Sharding:** Partition tweets by tweet_id or user_id
- **Timeline Sharding:** Partition user timelines by user_id
- **Read Replicas:** Multiple replicas for timeline reads
- **Cassandra Clusters:** Distributed across multiple data centers

### **Caching Strategy**
- **Timeline Cache:** Redis cluster with 1-hour TTL
- **Tweet Cache:** Hot tweets cached for 24 hours
- **User Cache:** User profiles cached for 6 hours
- **Search Cache:** Popular queries cached for 15 minutes

### **Load Distribution**
- **Geographic Load Balancing:** Route users to nearest data center
- **Service Mesh:** Istio for service-to-service communication
- **Auto-scaling:** Kubernetes for dynamic scaling
- **Circuit Breakers:** Prevent cascade failures

## 🚨 **Potential Bottlenecks & Solutions**

### **Celebrity Tweet Storm**
- **Problem:** Viral tweets causing massive fan-out
- **Solution:** Rate limiting, pull model for celebrities, async processing

### **Timeline Generation Latency**
- **Problem:** Slow timeline loading for users with many follows
- **Solution:** Pre-computation, intelligent caching, pagination optimization

### **Search Index Lag**
- **Problem:** New tweets not appearing in search immediately
- **Solution:** Near real-time indexing, search result caching

### **Hot Partition Problem**
- **Problem:** Popular tweets creating database hotspots
- **Solution:** Consistent hashing, read replicas, caching layers

## 📊 **Real-time Analytics**

### **Metrics Dashboard**
- **Tweet Volume:** Tweets per second, trending topics
- **User Engagement:** Likes, retweets, replies per minute
- **Timeline Performance:** Generation latency, cache hit rates
- **Search Metrics:** Query volume, result relevance

### **Event Processing**
- **Real-time Streams:** Kafka streams for live metrics
- **Batch Processing:** Hourly/daily aggregations with Spark
- **Anomaly Detection:** Alert on unusual traffic patterns
- **A/B Testing:** Timeline algorithm experiments

## 🔒 **Content Moderation & Safety**

### **Automated Moderation**
- **Text Analysis:** NLP for hate speech, spam detection
- **Image Recognition:** AI for inappropriate visual content
- **Behavior Analysis:** Detect bot accounts and coordinated attacks
- **Rate Limiting:** Prevent spam and abuse

### **Human Moderation**
- **Report System:** User-reported content queue
- **Escalation Process:** Complex cases for human review
- **Content Policies:** Clear community guidelines
- **Appeals Process:** Users can appeal moderation decisions

## 🔍 **Monitoring & Alerting**

### **System Health Metrics**
- **API Latency:** p95, p99 response times
- **Database Performance:** Query latency, replication lag
- **Cache Performance:** Hit rates, eviction rates
- **Message Queue:** Kafka lag, consumer processing rate

### **Business Metrics**
- **User Engagement:** Daily/monthly active users
- **Content Quality:** Spam detection rates
- **Timeline Effectiveness:** User time spent, click rates
- **Search Quality:** Query success rate, result relevance

### **Alerting Strategy**
- **Critical Alerts:** API failures, database outages
- **Performance Alerts:** High latency, low cache hit rates
- **Business Alerts:** Unusual user behavior, trending anomalies
- **Security Alerts:** Potential attacks, spam waves 