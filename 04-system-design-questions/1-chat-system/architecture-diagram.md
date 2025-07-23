# Chat System Architecture Diagram

```mermaid
graph TB
    subgraph "Client Layer"
        A[Mobile App] 
        B[Web App]
        C[Desktop App]
    end
    
    subgraph "Load Balancer"
        LB[Load Balancer<br/>NGINX/ALB]
    end
    
    subgraph "API Gateway"
        GW[API Gateway<br/>Kong/AWS API Gateway]
    end
    
    subgraph "Application Layer"
        WS1[WebSocket Server 1<br/>Node.js/Go]
        WS2[WebSocket Server 2<br/>Node.js/Go]
        WS3[WebSocket Server N<br/>Node.js/Go]
        
        US[User Service<br/>Java/Go]
        CS[Chat Service<br/>Java/Go]
        MS[Message Service<br/>Java/Go]
        NS[Notification Service<br/>Java/Go]
        FS[File Service<br/>Java/Go]
    end
    
    subgraph "Message Queue"
        K[Apache Kafka<br/>Message Topics]
        R[Redis Pub/Sub<br/>Real-time Events]
    end
    
    subgraph "Databases"
        PG[(PostgreSQL<br/>Users & Conversations)]
        CA[(Cassandra<br/>Messages)]
        RD[(Redis<br/>Cache & Presence)]
    end
    
    subgraph "Storage"
        S3[AWS S3<br/>Media Files]
        CDN[CloudFront CDN<br/>Media Delivery]
    end
    
    subgraph "External Services"
        PN[Push Notification<br/>FCM/APNS]
    end
    
    %% Client connections
    A --> LB
    B --> LB
    C --> LB
    
    %% Load balancer routing
    LB --> GW
    LB --> WS1
    LB --> WS2
    LB --> WS3
    
    %% API Gateway routing
    GW --> US
    GW --> CS
    GW --> MS
    GW --> FS
    
    %% WebSocket to services
    WS1 --> MS
    WS2 --> MS
    WS3 --> MS
    
    %% Service interactions
    US --> PG
    CS --> PG
    MS --> CA
    MS --> K
    NS --> PN
    FS --> S3
    
    %% Message queue processing
    K --> MS
    R --> WS1
    R --> WS2
    R --> WS3
    
    %% Caching
    US --> RD
    CS --> RD
    MS --> RD
    
    %% CDN for media
    S3 --> CDN
    CDN --> A
    CDN --> B
    CDN --> C
    
    %% Real-time message flow
    MS --> R
    R --> NS
```

## How to View This Diagram

1. **GitHub/GitLab**: This Mermaid diagram will render automatically when viewing the file
2. **VS Code**: Install the "Mermaid Preview" extension
3. **Online**: Copy the diagram code to [mermaid.live](https://mermaid.live)
4. **Documentation sites**: Works with GitBook, Notion, etc. 