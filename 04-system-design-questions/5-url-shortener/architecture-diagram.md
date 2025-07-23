# URL Shortener Architecture Diagram

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser<br/>Direct Access]
        B[Mobile Apps<br/>Third-party Integration]
        C[API Clients<br/>Developer Tools]
        D[Social Media<br/>Link Sharing]
    end
    
    subgraph "Global CDN Network"
        CDN1[CDN Edge<br/>North America]
        CDN2[CDN Edge<br/>Europe]
        CDN3[CDN Edge<br/>Asia Pacific]
        CDN4[CDN Edge<br/>Other Regions]
    end
    
    subgraph "Load Balancer"
        LB[Geographic Load Balancer<br/>Route53 NGINX<br/>SSL Termination]
    end
    
    subgraph "API Gateway"
        GW[API Gateway<br/>Kong AWS API Gateway<br/>Rate Limiting Auth Monitoring]
    end
    
    subgraph "Application Services"
        SS[Shortening Service<br/>URL Creation<br/>Go Java]
        RS[Redirect Service<br/>URL Resolution<br/>Go High Performance]
        AS[Analytics Service<br/>Click Tracking<br/>Java Python]
        US[User Service<br/>Account Management<br/>Java]
    end
    
    subgraph "Cache Layer"
        REDIS[Redis Cluster<br/>Hot URL Cache<br/>Session Data<br/>Rate Limiting]
        MCACHE[Memcached<br/>Application Cache<br/>Query Results]
    end
    
    subgraph "Message Queue"
        K[Apache Kafka<br/>Click Events<br/>Analytics Pipeline]
        SQS[SQS RabbitMQ<br/>Async Processing<br/>Email Notifications]
    end
    
    subgraph "Database Layer"
        PG_MASTER[(PostgreSQL Master<br/>URL Metadata<br/>User Data<br/>Write Operations)]
        PG_REPLICA1[(PostgreSQL Replica 1<br/>Read Operations<br/>Analytics Queries)]
        PG_REPLICA2[(PostgreSQL Replica 2<br/>Read Operations<br/>User Queries)]
    end
    
    subgraph "Analytics Storage"
        CH[(ClickHouse<br/>Time-series Analytics<br/>Click Events)]
        CASS[(Cassandra<br/>Historical Data<br/>Long-term Storage)]
    end
    
    subgraph "Analytics Pipeline"
        SPARK[Apache Spark<br/>Batch Processing<br/>Daily Weekly Reports]
        STREAM[Stream Processing<br/>Kafka Streams<br/>Real-time Analytics]
    end
    
    subgraph "External Services"
        DNS[DNS Provider<br/>Custom Domains<br/>Route53]
        SSL[SSL Certificates<br/>Let's Encrypt<br/>AWS Certificate Manager]
        GEO[Geo IP Service<br/>MaxMind<br/>IP Location]
    end
    
    subgraph "Monitoring & Logging"
        MON[Monitoring<br/>Prometheus<br/>Grafana<br/>DataDog]
        LOG[Logging<br/>ELK Stack<br/>Centralized Logs]
        ALERT[Alerting<br/>PagerDuty<br/>Slack Integration]
    end
    
    %% Client to CDN for cached redirects
    A --> CDN1
    B --> CDN2
    C --> CDN3
    D --> CDN4
    
    %% Client to Load Balancer for API calls
    A --> LB
    B --> LB
    C --> LB
    D --> LB
    
    %% CDN cache miss fallback
    CDN1 -.-> LB
    CDN2 -.-> LB
    CDN3 -.-> LB
    CDN4 -.-> LB
    
    %% Load Balancer to API Gateway
    LB --> GW
    
    %% API Gateway to Services
    GW --> SS
    GW --> RS
    GW --> AS
    GW --> US
    
    %% Services to Cache
    SS --> REDIS
    RS --> REDIS
    AS --> REDIS
    US --> REDIS
    
    %% Services to Database
    SS --> PG_MASTER
    RS --> PG_REPLICA1
    AS --> PG_REPLICA2
    US --> PG_REPLICA1
    
    %% Database replication
    PG_MASTER --> PG_REPLICA1
    PG_MASTER --> PG_REPLICA2
    
    %% Analytics flow
    RS --> K
    AS --> K
    K --> STREAM
    K --> CH
    STREAM --> REDIS
    STREAM --> CH
    
    %% Batch analytics
    CH --> SPARK
    PG_REPLICA2 --> SPARK
    SPARK --> CASS
    
    %% Cache warming from database
    PG_REPLICA1 --> REDIS
    
    %% External integrations
    RS --> GEO
    SS --> DNS
    LB --> SSL
    
    %% Monitoring connections
    MON -.-> SS
    MON -.-> RS
    MON -.-> AS
    MON -.-> US
    LOG -.-> SS
    LOG -.-> RS
    ALERT -.-> MON
    
    %% Async processing
    SS --> SQS
    US --> SQS
```

## How to View This Diagram

1. **GitHub/GitLab**: This Mermaid diagram will render automatically when viewing the file
2. **VS Code**: Install the "Mermaid Preview" extension
3. **Online**: Copy the diagram code to [mermaid.live](https://mermaid.live)
4. **Documentation sites**: Works with GitBook, Notion, etc. 