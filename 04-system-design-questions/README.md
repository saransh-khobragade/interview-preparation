# System Design Questions

This section contains **7 trending system design questions** commonly asked in technical interviews at top tech companies.

## 📋 **Questions Covered**

### **1. Chat System** (`1-chat-system/`)
**Similar to:** WhatsApp, Slack, Discord
- Real-time messaging
- Group chats and channels
- Online presence
- Message delivery guarantees
- **Scale:** Billions of users, millions of concurrent connections

### **2. Video Streaming Service** (`2-video-streaming/`)
**Similar to:** YouTube, Netflix, TikTok
- Video upload and encoding
- Content delivery network (CDN)
- Recommendation system
- Live streaming
- **Scale:** Petabytes of video data, millions of concurrent viewers

### **3. Social Media Feed** (`3-social-media-feed/`)
**Similar to:** Twitter, Instagram, Facebook
- News feed generation
- Content ranking algorithms
- Real-time updates
- Media content handling
- **Scale:** Billions of posts, millions of active users

### **4. Ride Sharing Service** (`4-ride-sharing/`)
**Similar to:** Uber, Lyft, Didi
- Real-time location tracking
- Driver-rider matching
- Dynamic pricing
- Trip management
- **Scale:** Millions of drivers, real-time geolocation

### **5. URL Shortener** (`5-url-shortener/`)
**Similar to:** bit.ly, TinyURL, t.co
- URL encoding/decoding
- Analytics and tracking
- Rate limiting
- Custom aliases
- **Scale:** Billions of URLs, high read/write ratio

### **6. Twitter Microblogging** (`6-twitter/`)
**Similar to:** Twitter/X, Mastodon
- Tweet posting and timeline
- Follower/following system
- Trending topics and hashtags
- Real-time notifications
- **Scale:** 500M users, billions of tweets

### **7. E-commerce Platform** (`7-e-commerce/`)
**Similar to:** Amazon, eBay, Shopify
- Product catalog and search
- Shopping cart and checkout
- Payment processing
- Order management
- **Scale:** Millions of products, peak shopping events

## 🎯 **What Each Question Includes**

✅ **System Architecture Diagrams** - Visual component relationships  
✅ **Database Schema Design** - Data modeling and relationships  
✅ **API Design** - RESTful endpoints and data flow  
✅ **Scalability Analysis** - Bottlenecks and optimization strategies  
✅ **Technology Stack** - Recommended tools and frameworks  
✅ **Trade-offs Discussion** - CAP theorem, consistency vs availability  
✅ **Load Estimation** - Traffic patterns and capacity planning  

## 📊 **Key System Design Concepts Covered**

- **Horizontal vs Vertical Scaling**
- **Load Balancing** (Round Robin, Least Connections, Consistent Hashing)
- **Database Design** (SQL vs NoSQL, Sharding, Replication)
- **Caching Strategies** (Redis, Memcached, CDN)
- **Message Queues** (Kafka, RabbitMQ, AWS SQS)
- **Microservices Architecture**
- **API Gateway and Rate Limiting**
- **Data Consistency** (Eventual vs Strong Consistency)
- **Monitoring and Observability**

## 🚀 **Interview Tips**

1. **Start with Requirements** - Clarify functional and non-functional requirements
2. **Estimate Scale** - Calculate users, requests per second, storage needs
3. **High-Level Design First** - Draw major components before diving deep
4. **Identify Bottlenecks** - Discuss potential issues and solutions
5. **Consider Trade-offs** - Explain decisions and alternative approaches
6. **Monitor and Scale** - Discuss metrics, alerts, and scaling strategies

## 📚 **Recommended Reading**

- **Books:** "Designing Data-Intensive Applications" by Martin Kleppmann
- **Resources:** High Scalability blog, AWS Architecture Center
- **Practice:** LeetCode System Design, Pramp, InterviewBit 