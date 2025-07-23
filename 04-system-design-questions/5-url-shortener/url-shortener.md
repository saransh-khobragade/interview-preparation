# Design a URL Shortener (bit.ly/TinyURL)

## 📋 **Requirements**

### **Functional Requirements**
- Shorten long URLs to short URLs
- Redirect short URLs to original URLs
- Custom aliases for shortened URLs
- URL expiration and TTL
- Analytics and click tracking
- User accounts and URL management
- Rate limiting and spam protection

### **Non-Functional Requirements**
- **Scale:** 100M URLs shortened per day, 10B redirects per day
- **Latency:** < 100ms for URL redirection
- **Availability:** 99.9% uptime
- **Durability:** URLs should not be lost
- **Read/Write Ratio:** 100:1 (heavy read system)

## 🎯 **Capacity Estimation**

### **Traffic Estimates**
- **URL Creation:** 100M new URLs/day (~1,160 URLs/second)
- **URL Redirection:** 10B redirects/day (~115K redirects/second)
- **Peak Traffic:** 5x average = 500K redirects/second

### **Storage Estimates**
- **URL Records:** 100M URLs/day × 500 bytes = 50GB/day
- **5 Year Storage:** 50GB × 365 × 5 = ~90TB
- **Click Analytics:** 10B clicks/day × 100 bytes = 1TB/day

### **Bandwidth Estimates**
- **Incoming:** 1,160 requests/second × 500 bytes = ~0.6MB/s
- **Outgoing:** 115K requests/second × 500 bytes = ~58MB/s

## 🏗️ **High-Level Architecture**

The URL shortener uses a microservices architecture with heavy caching and CDN for global performance. The system is designed as a read-heavy workload with eventual consistency.

## 📊 **Database Design**

### **URL Service Database**
```sql
urls: url_id, short_code, original_url, user_id, created_at, expires_at, is_active, click_count
url_analytics: url_id, date, click_count, unique_clicks, referrer_stats, country_stats
custom_aliases: alias, url_id, user_id, created_at
```

### **User Service Database**
```sql
users: user_id, email, username, password_hash, subscription_tier, created_at
user_quotas: user_id, urls_created_today, api_calls_today, quota_limit
api_keys: key_id, user_id, api_key_hash, permissions, created_at, last_used
```

### **Analytics Database** (Time-series)
```sql
click_events: event_id, url_id, timestamp, ip_address, user_agent, referrer, country, device_type
daily_stats: url_id, date, total_clicks, unique_visitors, top_referrers, geographic_breakdown
```

## 🔌 **API Design**

### **URL Management APIs**
```
POST /api/v1/shorten - Create short URL
GET /api/v1/urls/{short_code} - Get URL details  
PUT /api/v1/urls/{short_code} - Update URL (custom alias, expiration)
DELETE /api/v1/urls/{short_code} - Delete URL
GET /api/v1/users/{user_id}/urls - List user's URLs
```

### **Redirection APIs**
```
GET /{short_code} - Redirect to original URL (main functionality)
GET /preview/{short_code} - Preview URL without redirect
GET /api/v1/validate/{short_code} - Check if URL exists and is active
```

### **Analytics APIs**
```
GET /api/v1/analytics/{short_code} - Get URL analytics
GET /api/v1/analytics/{short_code}/clicks?period=7d - Get click data
GET /api/v1/analytics/{short_code}/referrers - Get top referrers
GET /api/v1/analytics/{short_code}/geographic - Get geographic data
```

## 🎯 **Short Code Generation**

### **Base62 Encoding**
- **Character Set:** [a-z, A-Z, 0-9] = 62 characters
- **Short Code Length:** 7 characters = 62^7 = ~3.5 trillion combinations
- **Algorithm:** Use auto-incrementing counter + base62 encoding
- **Benefits:** Predictable, no collisions, compact

### **Alternative: Random Generation + Collision Handling**
```python
def generate_short_code():
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    return ''.join(random.choice(chars) for _ in range(7))
```

### **Counter-based Generation**
```python
def counter_to_base62(counter):
    base62_chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    result = ""
    while counter > 0:
        result = base62_chars[counter % 62] + result
        counter //= 62
    return result.rjust(7, 'a')  # Pad to 7 characters
```

## ⚡ **Technology Stack**

### **Application Layer**
- **API Gateway:** Kong, AWS API Gateway for rate limiting
- **Web Servers:** NGINX for static content and load balancing
- **Microservices:** Go/Java for high-throughput services

### **Caching & CDN**
- **Redis Cluster:** Multi-level caching for hot URLs
- **CDN:** CloudFront, CloudFlare for global edge caching
- **Application Cache:** In-memory LRU cache for frequently accessed URLs

### **Databases**
- **Primary Database:** PostgreSQL for URL metadata
- **Analytics Database:** ClickHouse/Cassandra for time-series data
- **Cache Database:** Redis for hot data and rate limiting

### **Message Queue**
- **Apache Kafka:** Async processing of analytics events
- **Redis Pub/Sub:** Real-time notifications and cache invalidation

## 🚀 **Caching Strategy**

### **Multi-level Caching Architecture**

#### **Level 1: CDN Edge Cache**
- **TTL:** 24 hours for popular URLs
- **Cache Key:** short_code
- **Benefits:** Global distribution, reduces origin load
- **Strategy:** Cache-aside pattern with origin pull

#### **Level 2: Application Cache (Redis)**
- **TTL:** 6 hours, LRU eviction
- **Hot Data:** Most frequently accessed URLs (80/20 rule)
- **Cache Warming:** Preload trending URLs
- **Invalidation:** Event-driven cache invalidation

#### **Level 3: Database Read Replicas**
- **Read Replicas:** Multiple read replicas for query distribution
- **Connection Pooling:** Efficient database connection management
- **Query Optimization:** Indexes on short_code and user_id

### **Cache Patterns**
```python
def get_url(short_code):
    # Level 1: Check application cache
    url = redis.get(f"url:{short_code}")
    if url:
        return url
    
    # Level 2: Check database
    url = database.get_url(short_code)
    if url:
        # Cache for future requests
        redis.setex(f"url:{short_code}", 21600, url)  # 6 hours
        return url
    
    return None
```

## 🔄 **URL Shortening Flow**

### **Creation Process**
1. **Validate Input:** Check URL format, length, blacklist
2. **Check Existing:** Avoid duplicate short codes for same URL/user
3. **Generate Short Code:** Counter-based or random generation
4. **Store in Database:** Save URL mapping with metadata
5. **Cache Warm:** Preload popular URLs into cache
6. **Return Short URL:** Provide shortened URL to user

### **Redirection Process**
1. **Extract Short Code:** Parse URL path parameter
2. **Check Cache:** Look up in Redis/CDN cache first
3. **Database Lookup:** Query database if cache miss
4. **Validate URL:** Check expiration, active status
5. **Record Analytics:** Async logging of click event
6. **HTTP Redirect:** Return 301/302 redirect response

## 📊 **Analytics System**

### **Real-time Click Tracking**
- **Event Collection:** Kafka streams for click events
- **Batch Processing:** Hourly aggregation using Spark
- **Real-time Dashboard:** WebSocket updates for live stats
- **Geographic Analysis:** IP-to-location mapping

### **Analytics Data Pipeline**
```
Click Event → Kafka → Stream Processing → ClickHouse → Analytics API → Dashboard
```

### **Metrics Tracked**
- **Basic Metrics:** Total clicks, unique visitors, click rate
- **Temporal Analysis:** Hourly, daily, weekly trends
- **Geographic Data:** Country, city, timezone analysis
- **Referrer Analysis:** Traffic sources and social media
- **Device Analysis:** Mobile vs desktop, browser types

## 🛡️ **Rate Limiting & Security**

### **Rate Limiting Strategy**
- **IP-based Limiting:** 1000 requests/hour for anonymous users
- **User-based Limiting:** 10,000 requests/hour for registered users
- **API Key Limiting:** Different tiers based on subscription
- **Sliding Window:** Redis-based sliding window counter

### **Security Measures**
- **URL Validation:** Prevent malicious URLs, phishing sites
- **Blacklist Integration:** Check against known malware domains
- **CAPTCHA:** Human verification for high-volume users
- **API Authentication:** JWT tokens, API keys with scopes

### **Rate Limiting Implementation**
```python
def is_rate_limited(user_id, window_size=3600, max_requests=1000):
    key = f"rate_limit:{user_id}"
    current_time = int(time.time())
    
    # Sliding window using sorted sets
    redis.zremrangebyscore(key, 0, current_time - window_size)
    request_count = redis.zcard(key)
    
    if request_count >= max_requests:
        return True
    
    redis.zadd(key, {current_time: current_time})
    redis.expire(key, window_size)
    return False
```

## 🚀 **Scalability Solutions**

### **Database Scaling**
- **Read Replicas:** Multiple read replicas for query distribution
- **Sharding:** Partition by short_code hash or user_id
- **Vertical Partitioning:** Separate analytics data from core URL data
- **Archive Strategy:** Move old URLs to cold storage

### **Horizontal Scaling**
- **Microservice Architecture:** Independent scaling of components
- **Load Balancing:** Geographic and weighted load distribution
- **Auto-scaling:** Dynamic scaling based on traffic patterns
- **Circuit Breakers:** Prevent cascade failures

### **Global Distribution**
- **Multi-region Deployment:** Deploy in multiple AWS regions
- **DNS-based Routing:** Route53 for geographic traffic routing
- **CDN Edge Locations:** 200+ edge locations globally
- **Regional Database Replicas:** Read replicas in each region

## 🚨 **Potential Bottlenecks & Solutions**

### **Database Write Hotspots**
- **Problem:** High concurrent writes during traffic spikes
- **Solution:** Write sharding, queue-based writes, async processing

### **Cache Invalidation**
- **Problem:** Stale data in multi-level cache
- **Solution:** Event-driven invalidation, TTL optimization, cache versioning

### **Short Code Collisions**
- **Problem:** Random generation causing duplicate codes
- **Solution:** Counter-based generation, pre-generated pool, collision detection

### **Analytics Processing Lag**
- **Problem:** Real-time analytics falling behind during peaks
- **Solution:** Stream processing optimization, batch processing backup, sampling

## 🔍 **Monitoring & Observability**

### **Key Metrics**
- **Latency:** p95, p99 response times for redirects
- **Throughput:** Requests per second for creation and redirection
- **Cache Hit Ratio:** Cache effectiveness across all levels
- **Error Rates:** 4xx, 5xx error percentages
- **Database Performance:** Query latency, connection pool usage

### **Alerting Strategy**
- **High Latency:** Alert if p95 > 200ms for 5 minutes
- **High Error Rate:** Alert if error rate > 1% for 2 minutes
- **Cache Issues:** Alert if cache hit ratio < 80%
- **Database Issues:** Alert if connection pool > 80% usage

### **Business Metrics**
- **URL Creation Rate:** New URLs per hour/day
- **Popular Domains:** Most shortened domains
- **User Engagement:** URLs per user, retention rates
- **Geographic Usage:** Usage patterns by country/region

## 🔧 **Operational Considerations**

### **Data Retention**
- **URL Data:** Keep active URLs indefinitely, archive expired URLs
- **Analytics Data:** 2 years detailed data, aggregated data for longer
- **User Data:** Follow GDPR/privacy regulations for data deletion

### **Backup & Recovery**
- **Database Backups:** Daily full backups, hourly incremental
- **Cross-region Replication:** Real-time replication for disaster recovery
- **Point-in-time Recovery:** Ability to recover to specific timestamps
- **Cache Recovery:** Warm caches after failures

### **Custom Domains**
- **Vanity URLs:** Allow custom domains (e.g., company.co/xyz)
- **SSL Certificates:** Automatic SSL certificate management
- **DNS Configuration:** CNAME setup for custom domains
- **White-label Solution:** Complete branding customization 