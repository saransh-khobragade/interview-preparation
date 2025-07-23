# Design a Chat System (WhatsApp/Slack)

## 📋 **Requirements**

### **Functional Requirements**
- Send and receive messages in real-time
- Support 1-on-1 and group chats
- Show online/offline status
- Message delivery status (sent, delivered, read)
- File and media sharing
- Message history and search

### **Non-Functional Requirements**
- **Scale:** 500M daily active users, 100M concurrent connections
- **Latency:** < 100ms message delivery
- **Availability:** 99.9% uptime
- **Consistency:** Eventually consistent for message ordering

## 🎯 **Capacity Estimation**

- **Users:** 500M DAU, peak 100M concurrent
- **Messages:** 50 billion messages/day (~580K messages/second)
- **Storage:** 100 bytes/message → 5TB/day, 1.8PB/year
- **Bandwidth:** 
  - Incoming: 580K × 100 bytes = 58MB/s
  - Outgoing: 58MB/s × 2 (sender + receiver) = 116MB/s

## 🏗️ **High-Level Architecture**

The chat system uses a microservices architecture with WebSocket connections for real-time communication.

## 📊 **Database Design**

### **User Service Database**
```sql
users: user_id, username, email, phone, last_seen, is_online, created_at
user_settings: user_id, notifications_enabled, theme, language
```

### **Chat Service Database** 
```sql
conversations: conversation_id, type (direct/group), created_at, updated_at
participants: conversation_id, user_id, role, joined_at, left_at
messages: message_id, conversation_id, sender_id, content, message_type, timestamp, parent_message_id
message_status: message_id, user_id, status (sent/delivered/read), timestamp
```

### **Media Service Database**
```sql
media_files: file_id, conversation_id, sender_id, file_type, file_size, file_url, thumbnail_url, uploaded_at
```

## 🔌 **API Design**

### **REST APIs**
```
POST /api/v1/conversations - Create conversation
GET /api/v1/conversations/{id}/messages - Get message history
POST /api/v1/media/upload - Upload media files
GET /api/v1/users/{id}/conversations - Get user conversations
PUT /api/v1/users/{id}/status - Update online status
```

### **WebSocket Events**
```
// Client to Server
send_message: {conversation_id, content, message_type}
join_conversation: {conversation_id}
typing_indicator: {conversation_id, is_typing}
read_receipt: {message_id}

// Server to Client
new_message: {message_id, conversation_id, sender, content, timestamp}
message_status: {message_id, status, user_id}
user_online: {user_id, status}
typing_update: {conversation_id, user_id, is_typing}
```

## ⚡ **Technology Stack**

- **Load Balancer:** NGINX, AWS ALB
- **API Gateway:** Kong, AWS API Gateway  
- **WebSocket Service:** Node.js, Socket.io, Go
- **Message Service:** Java/Go microservices
- **Message Queue:** Apache Kafka, Redis Pub/Sub
- **Database:** 
  - PostgreSQL (user data, conversations)
  - Cassandra (messages - time-series data)
  - Redis (online presence, caching)
- **File Storage:** AWS S3, CDN
- **Monitoring:** Prometheus, Grafana, ELK Stack

## 🚀 **Scalability Solutions**

### **WebSocket Connection Management**
- **Connection Servers:** Stateful servers managing WebSocket connections
- **Service Discovery:** Find which server holds user's connection
- **Load Balancing:** Consistent hashing for connection distribution

### **Message Storage**
- **Database Sharding:** Shard by conversation_id or user_id
- **Time-based Partitioning:** Partition messages by timestamp
- **Read Replicas:** Multiple read replicas for message history

### **Real-time Message Delivery**
- **Message Queue:** Kafka topics partitioned by conversation
- **Push Service:** Dedicated service for offline push notifications
- **Message Ordering:** Use timestamps and vector clocks

### **Caching Strategy**
- **Recent Messages:** Cache last 100 messages per conversation
- **Online Users:** Redis for real-time presence
- **User Sessions:** Cache user authentication tokens

## 🔄 **Message Flow**

1. **User A sends message** → WebSocket Server
2. **Server validates** message and user permissions  
3. **Message published** to Kafka topic
4. **Message stored** in Cassandra database
5. **Kafka consumer** processes message for delivery
6. **Find recipient's connection** via service discovery
7. **Deliver via WebSocket** to online users
8. **Send push notification** to offline users
9. **Update delivery status** when received/read

## 🎯 **Key Design Decisions**

### **WebSocket vs HTTP**
- **WebSocket:** Real-time, persistent connections, lower latency
- **HTTP:** Message history, file uploads, API operations

### **Database Choices**
- **PostgreSQL:** ACID compliance for user data and conversations
- **Cassandra:** High write throughput for messages, time-series data
- **Redis:** Fast lookups for online presence and caching

### **Message Ordering**
- **Vector Clocks:** Handle message ordering in distributed system
- **Lamport Timestamps:** Ensure causal ordering of messages

## 🚨 **Potential Bottlenecks & Solutions**

### **WebSocket Server Overload**
- **Problem:** Too many connections per server
- **Solution:** Horizontal scaling, connection limit per server

### **Message Queue Lag**
- **Problem:** High message volume causing delays
- **Solution:** Partition Kafka topics, multiple consumer groups

### **Database Write Hotspots**
- **Problem:** Popular group chats creating write hotspots
- **Solution:** Shard by conversation_id with consistent hashing

### **File Upload Bottleneck**
- **Problem:** Large media files blocking message service
- **Solution:** Separate media service, direct S3 uploads

## 🔍 **Monitoring & Metrics**

- **Message Latency:** p95, p99 delivery times
- **Connection Health:** Active connections per server
- **Queue Depth:** Kafka lag and processing rate
- **Database Performance:** Query latency, replication lag
- **Error Rates:** Failed message deliveries, connection drops

## 🔒 **Security Considerations**

- **End-to-End Encryption:** Signal Protocol for message encryption
- **Authentication:** JWT tokens, OAuth 2.0
- **Rate Limiting:** Prevent spam and abuse
- **Input Validation:** Sanitize message content
- **Access Control:** Verify user permissions for conversations 