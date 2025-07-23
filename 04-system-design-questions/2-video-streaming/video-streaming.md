# Design a Video Streaming Service (YouTube/Netflix)

## 📋 **Requirements**

### **Functional Requirements**
- Upload and store videos
- Stream videos to users globally
- Support multiple video qualities (360p, 720p, 1080p, 4K)
- Video search and discovery
- User profiles and subscriptions
- Comments and likes
- Recommendation system

### **Non-Functional Requirements**
- **Scale:** 2B users, 1B hours watched daily
- **Storage:** 500 hours uploaded per minute
- **Bandwidth:** Millions of concurrent viewers
- **Latency:** < 150ms video start time
- **Availability:** 99.95% uptime

## 🎯 **Capacity Estimation**

### **Storage Requirements**
- **Upload Rate:** 500 hours/minute = 30,000 hours/hour
- **File Sizes:** 1 hour video ≈ 1GB (multiple qualities = 3GB total)
- **Daily Storage:** 30K × 24 × 3GB = 2.16TB/day
- **Annual Storage:** 2.16TB × 365 = 788TB/year

### **Bandwidth Requirements**
- **Concurrent Viewers:** 10M peak concurrent
- **Average Bitrate:** 1 Mbps (considering multiple qualities)
- **Total Bandwidth:** 10M × 1 Mbps = 10 Tbps

### **CDN Requirements**
- **Global Distribution:** 200+ edge locations
- **Cache Hit Ratio:** 95% for popular content
- **Cache Storage:** 100TB per major edge location

## 🏗️ **High-Level Architecture**

The video streaming service uses a microservices architecture with CDN for global content delivery and multiple encoding pipelines for different video qualities.

## 📊 **Database Design**

### **User Service Database**
```sql
users: user_id, username, email, profile_image, subscription_tier, created_at
subscriptions: subscriber_id, channel_id, subscribed_at, notification_enabled
user_preferences: user_id, preferred_quality, autoplay_enabled, language
```

### **Video Service Database**
```sql
videos: video_id, uploader_id, title, description, duration, upload_date, view_count, like_count
video_metadata: video_id, file_size, encoding_status, thumbnail_url, captions_url
video_files: video_id, quality (360p/720p/1080p/4K), file_url, bitrate, codec
channels: channel_id, user_id, channel_name, description, subscriber_count
```

### **Analytics Database**
```sql
video_views: view_id, video_id, user_id, timestamp, watch_duration, quality, device_type
video_interactions: interaction_id, video_id, user_id, type (like/dislike/comment), timestamp
search_queries: query_id, user_id, search_term, timestamp, clicked_video_id
```

### **Recommendation Database**
```sql
user_interests: user_id, category, interest_score, last_updated
video_features: video_id, category, tags, language, content_features
recommendation_cache: user_id, video_id, score, generated_at
```

## 🔌 **API Design**

### **Video APIs**
```
POST /api/v1/videos/upload - Upload video
GET /api/v1/videos/{video_id} - Get video metadata
GET /api/v1/videos/{video_id}/stream - Get streaming URL
PUT /api/v1/videos/{video_id}/view - Record video view
POST /api/v1/videos/{video_id}/like - Like/unlike video
```

### **Search APIs**
```
GET /api/v1/search/videos?q={query}&page={page} - Search videos
GET /api/v1/trending?category={category} - Get trending videos
GET /api/v1/recommendations/{user_id} - Get personalized recommendations
```

### **User APIs**
```
GET /api/v1/users/{user_id}/videos - Get user's uploaded videos
GET /api/v1/users/{user_id}/subscriptions - Get user subscriptions
POST /api/v1/users/{user_id}/subscribe/{channel_id} - Subscribe to channel
```

## ⚡ **Technology Stack**

### **Application Layer**
- **API Gateway:** Kong, AWS API Gateway
- **Microservices:** Java Spring Boot, Go, Node.js
- **Load Balancer:** NGINX, AWS ALB

### **Video Processing**
- **Encoding:** FFmpeg, AWS Elemental MediaConvert
- **Transcoding Pipeline:** Kubernetes jobs, AWS Batch
- **Message Queue:** Apache Kafka, AWS SQS

### **Storage & CDN**
- **Object Storage:** AWS S3, Google Cloud Storage
- **CDN:** CloudFront, CloudFlare, Akamai
- **Cache:** Redis for metadata caching

### **Databases**
- **Video Metadata:** PostgreSQL with read replicas
- **Analytics:** Apache Cassandra, ClickHouse
- **Search:** Elasticsearch
- **Recommendations:** Redis, Machine Learning models

### **Monitoring & Analytics**
- **Metrics:** Prometheus, Grafana
- **Logs:** ELK Stack (Elasticsearch, Logstash, Kibana)
- **Video Analytics:** Custom analytics pipeline

## 🎬 **Video Upload & Processing Flow**

### **Upload Process**
1. **Client uploads** video to nearest upload server
2. **Upload service** saves raw video to object storage
3. **Metadata extracted** (duration, resolution, codec)
4. **Transcoding job** queued for multiple qualities
5. **Thumbnail generation** for video preview
6. **Content moderation** for policy compliance

### **Transcoding Pipeline**
1. **Job dispatcher** picks up transcoding requests
2. **Worker nodes** process video encoding in parallel
3. **Multiple qualities** generated (360p, 720p, 1080p, 4K)
4. **Adaptive bitrate** streaming files created
5. **Processed videos** uploaded to CDN storage
6. **Database updated** with file locations

## 📺 **Video Streaming Flow**

### **Playback Process**
1. **User requests** video playback
2. **CDN determines** closest edge server
3. **Video manifest** returned with available qualities
4. **Client downloads** video segments progressively
5. **Adaptive bitrate** adjusts quality based on bandwidth
6. **Analytics recorded** for view tracking

### **CDN Strategy**
- **Popular Content:** Pre-cached at all edge locations
- **Long Tail Content:** Cached on-demand at regional edges
- **Cache Invalidation:** TTL-based with manual override
- **Geolocation:** Route users to nearest edge server

## 🔍 **Search & Recommendation System**

### **Search Infrastructure**
- **Elasticsearch Cluster:** Index video metadata, titles, descriptions
- **Auto-complete:** Trie data structure for search suggestions
- **Search Ranking:** TF-IDF, view count, freshness, user preferences
- **Faceted Search:** Filter by duration, upload date, quality

### **Recommendation Engine**
- **Collaborative Filtering:** User-item interactions
- **Content-Based Filtering:** Video features and user preferences
- **Deep Learning:** Neural networks for complex pattern recognition
- **Real-time Pipeline:** Update recommendations based on recent activity

## 🚀 **Scalability Solutions**

### **Horizontal Scaling**
- **Microservices:** Independent scaling of different components
- **Database Sharding:** Partition by user_id or video_id
- **CDN Scaling:** Add edge locations based on user distribution

### **Caching Strategy**
- **Video Metadata:** Redis cache for frequently accessed data
- **Search Results:** Cache popular queries and trending videos
- **User Sessions:** Cache authentication and user preferences
- **CDN Caching:** Multi-tier caching with different TTLs

### **Load Distribution**
- **Geographic Load Balancing:** Route traffic to nearest data center
- **Service Discovery:** Dynamic discovery of healthy service instances
- **Circuit Breakers:** Prevent cascade failures between services

## 🎯 **Key Design Decisions**

### **Video Storage Format**
- **Adaptive Bitrate Streaming:** HLS (HTTP Live Streaming) or DASH
- **Multiple Qualities:** Encode in 360p, 720p, 1080p, 4K
- **Codec Selection:** H.264 for compatibility, H.265 for efficiency

### **CDN Strategy**
- **Push vs Pull:** Push popular content, pull long-tail content
- **Regional Caches:** Balance between cost and performance
- **Cache Hierarchy:** Multiple cache tiers for different content types

### **Database Choices**
- **PostgreSQL:** ACID compliance for user data and video metadata
- **Cassandra:** High write throughput for analytics and view tracking
- **Elasticsearch:** Full-text search capabilities for video discovery

## 🚨 **Potential Bottlenecks & Solutions**

### **Video Upload Bottleneck**
- **Problem:** Large video files causing upload timeouts
- **Solution:** Chunked uploads, resumable uploads, multiple upload servers

### **Transcoding Queue Backlog**
- **Problem:** High upload volume overwhelming transcoding capacity
- **Solution:** Auto-scaling transcoding workers, priority queues

### **CDN Cache Miss**
- **Problem:** Popular videos not cached causing origin server load
- **Solution:** Predictive caching, better cache warming strategies

### **Database Write Load**
- **Problem:** High view tracking writes causing database bottleneck
- **Solution:** Batch writes, write-optimized databases, eventual consistency

## 🔍 **Monitoring & Metrics**

### **Video Performance**
- **Buffering Ratio:** Percentage of playback time spent buffering
- **Start Time:** Time from play button to first frame
- **Quality Switches:** Frequency of adaptive bitrate changes
- **Completion Rate:** Percentage of videos watched to completion

### **System Health**
- **CDN Hit Ratio:** Cache effectiveness across edge locations
- **Transcoding Queue Length:** Backlog of pending encoding jobs
- **Database Query Performance:** Latency and throughput metrics
- **API Response Times:** Service-level latency monitoring

## 🔒 **Security & Content Protection**

### **Content Security**
- **DRM (Digital Rights Management):** Protect premium content
- **Token-based Authentication:** Secure video access URLs
- **Geo-blocking:** Restrict content based on user location
- **Watermarking:** Embed user/session info in video streams

### **Content Moderation**
- **Automated Detection:** AI-based detection of inappropriate content
- **Human Review:** Manual review for edge cases
- **Community Flagging:** User-reported content review system
- **DMCA Compliance:** Copyright infringement detection and removal 