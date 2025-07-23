# Social Media Feed Architecture Diagram

```mermaid
graph TB
    subgraph "Client Layer"
        A[Mobile Apps<br/>iOS/Android]
        B[Web Browser<br/>React/Vue]
        C[API Clients<br/>Third-party]
    end
    
    subgraph "Load Balancer & CDN"
        LB[Load Balancer<br/>NGINX/ALB]
        CDN[CDN<br/>CloudFront/CloudFlare]
    end
    
    subgraph "API Gateway"
        GW[API Gateway<br/>Kong/AWS API Gateway<br/>Rate Limiting, Auth]
    end
    
    subgraph "Application Services"
        PS[Post Service<br/>Create, Update, Delete]
        FS[Feed Service<br/>Timeline Generation]
        US[User Service<br/>Profiles, Relationships]
        SS[Search Service<br/>Content Discovery]
        NS[Notification Service<br/>Real-time Updates]
        MS[Media Service<br/>Upload, Processing]
    end
    
    subgraph "Feed Generation Pipeline"
        Q[Message Queue<br/>Kafka/SQS<br/>Fan-out Events]
        FG1[Feed Generator 1<br/>Push Model]
        FG2[Feed Generator 2<br/>Pull Model] 
        FG3[Feed Generator N<br/>Hybrid Model]
        RS[Ranking Service<br/>ML-based Ranking]
    end
    
    subgraph "Data Storage"
        PG[(PostgreSQL<br/>User Data<br/>Relationships)]
        MONGO[(MongoDB<br/>Post Content<br/>Media Metadata)]
        ES[(Elasticsearch<br/>Search Index<br/>Content Discovery)]
    end
    
    subgraph "Feed Storage & Cache"
        REDIS[(Redis Cluster<br/>Hot Feed Cache<br/>User Sessions)]
        CASS[(Cassandra<br/>User Feeds<br/>Historical Data)]
    end
    
    subgraph "Media Storage"
        S3[Object Storage<br/>AWS S3/GCS<br/>Images, Videos]
        IMG[Image Processing<br/>Thumbnails, Optimization]
    end
    
    subgraph "Analytics & ML"
        SPARK[Spark Cluster<br/>Batch Analytics<br/>User Insights]
        ML[ML Pipeline<br/>Content Ranking<br/>Recommendations]
        STREAM[Stream Processing<br/>Kafka Streams<br/>Real-time Analytics]
    end
    
    subgraph "External Services"
        PN[Push Notifications<br/>FCM/APNS]
        MOD[Content Moderation<br/>AI/Human Review]
    end
    
    %% Client connections
    A --> LB
    B --> LB
    C --> LB
    
    %% Load balancer to services
    LB --> GW
    
    %% API Gateway routing
    GW --> PS
    GW --> FS
    GW --> US
    GW --> SS
    GW --> NS
    GW --> MS
    
    %% Service interactions
    PS --> PG
    PS --> MONGO
    PS --> Q
    US --> PG
    FS --> REDIS
    FS --> CASS
    SS --> ES
    MS --> S3
    MS --> IMG
    
    %% Feed generation pipeline
    Q --> FG1
    Q --> FG2
    Q --> FG3
    FG1 --> REDIS
    FG2 --> CASS
    FG3 --> REDIS
    FG1 --> RS
    FG2 --> RS
    FG3 --> RS
    
    %% Feed service gets ranked content
    RS --> FS
    
    %% CDN for media delivery
    S3 --> CDN
    CDN --> A
    CDN --> B
    CDN --> C
    
    %% Analytics and ML
    MONGO --> SPARK
    REDIS --> STREAM
    SPARK --> ML
    STREAM --> ML
    ML --> RS
    
    %% Notifications
    NS --> PN
    NS --> A
    NS --> B
    
    %% Content moderation
    PS --> MOD
    MOD --> PS
    
    %% Search indexing
    PS --> ES
    MONGO --> ES
```

## How to View This Diagram

1. **GitHub/GitLab**: This Mermaid diagram will render automatically when viewing the file
2. **VS Code**: Install the "Mermaid Preview" extension
3. **Online**: Copy the diagram code to [mermaid.live](https://mermaid.live)
4. **Documentation sites**: Works with GitBook, Notion, etc. 