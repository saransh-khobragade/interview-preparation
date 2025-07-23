# Twitter Microblogging Platform Architecture Diagram

```mermaid
graph TB
    subgraph "Client Applications"
        WEB[Web Application<br/>React TypeScript]
        MOB[Mobile Apps<br/>iOS Android]
        API[Third-party Apps<br/>API Clients]
    end
    
    subgraph "Load Balancer & CDN"
        LB[Load Balancer<br/>Geographic Routing<br/>NGINX AWS ALB]
        CDN[CDN Network<br/>Media Delivery<br/>CloudFront]
    end
    
    subgraph "API Gateway"
        GW[API Gateway<br/>Kong AWS API Gateway<br/>Rate Limiting Auth]
    end
    
    subgraph "Core Microservices"
        TS[Tweet Service<br/>Tweet CRUD<br/>Java Go]
        TLS[Timeline Service<br/>Feed Generation<br/>Java]
        US[User Service<br/>Profiles Follow<br/>Java]
        SS[Search Service<br/>Tweet User Search<br/>Java]
        NS[Notification Service<br/>Real-time Updates<br/>Node.js]
        MS[Media Service<br/>Image Video Upload<br/>Go]
    end
    
    subgraph "Timeline Generation"
        FO[Fan-out Service<br/>Push Model<br/>Go]
        TG[Timeline Generator<br/>Pull Model<br/>Java]
        RS[Ranking Service<br/>ML Ranking<br/>Python]
    end
    
    subgraph "Real-time Processing"
        WS[WebSocket Service<br/>Live Notifications<br/>Node.js Socket.io]
        KAFKA[Apache Kafka<br/>Event Streaming<br/>Tweet Events]
        STREAM[Stream Processing<br/>Kafka Streams<br/>Trending Topics]
    end
    
    subgraph "Databases"
        PG[(PostgreSQL<br/>User Data<br/>Relationships)]
        CASS[(Cassandra<br/>Tweet Storage<br/>High Write Throughput)]
        ES[(Elasticsearch<br/>Search Index<br/>Tweet User Search)]
    end
    
    subgraph "Cache & Timeline Storage"
        REDIS[Redis Cluster<br/>Timeline Cache<br/>Hot Data]
        TIMELINE_DB[(Timeline Database<br/>Cassandra<br/>Pre-computed Feeds)]
    end
    
    subgraph "Analytics & ML"
        CLICK[(ClickHouse<br/>Analytics Data<br/>Metrics Events)]
        SPARK[Apache Spark<br/>Batch Analytics<br/>Trending Analysis]
        ML[ML Pipeline<br/>Recommendation<br/>Content Ranking]
    end
    
    subgraph "Storage & External"
        S3[Object Storage<br/>AWS S3<br/>Media Files]
        TREND[Trending Service<br/>Hashtag Analysis<br/>Go]
        MOD[Content Moderation<br/>AI Human Review<br/>Python]
    end
    
    subgraph "Monitoring"
        PROM[Prometheus<br/>Metrics Collection]
        GRAF[Grafana<br/>Dashboards]
        LOG[ELK Stack<br/>Log Analysis]
    end
    
    %% Client connections
    WEB --> LB
    MOB --> LB
    API --> LB
    
    %% CDN for media
    S3 --> CDN
    CDN --> WEB
    CDN --> MOB
    CDN --> API
    
    %% Load balancer to API Gateway
    LB --> GW
    
    %% API Gateway to services
    GW --> TS
    GW --> TLS
    GW --> US
    GW --> SS
    GW --> NS
    GW --> MS
    
    %% Core service interactions
    TS --> CASS
    TS --> KAFKA
    US --> PG
    SS --> ES
    MS --> S3
    
    %% Timeline generation flow
    TS --> FO
    FO --> TIMELINE_DB
    TLS --> TIMELINE_DB
    TLS --> TG
    TG --> CASS
    TLS --> RS
    RS --> REDIS
    
    %% Real-time processing
    KAFKA --> STREAM
    KAFKA --> NS
    NS --> WS
    WS --> WEB
    WS --> MOB
    
    %% Caching layer
    TLS --> REDIS
    US --> REDIS
    SS --> REDIS
    
    %% Search indexing
    TS --> ES
    US --> ES
    
    %% Analytics pipeline
    KAFKA --> CLICK
    CLICK --> SPARK
    SPARK --> ML
    ML --> RS
    
    %% Trending topics
    STREAM --> TREND
    TREND --> REDIS
    
    %% Content moderation
    TS --> MOD
    MS --> MOD
    
    %% Monitoring
    PROM -.-> TS
    PROM -.-> TLS
    PROM -.-> US
    GRAF -.-> PROM
    LOG -.-> TS
    LOG -.-> TLS
```

## How to View This Diagram

1. **GitHub/GitLab**: This Mermaid diagram will render automatically when viewing the file
2. **VS Code**: Install the "Mermaid Preview" extension
3. **Online**: Copy the diagram code to [mermaid.live](https://mermaid.live)
4. **Documentation sites**: Works with GitBook, Notion, etc. 