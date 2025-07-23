# Video Streaming Service Architecture Diagram

```mermaid
graph TB
    subgraph "Client Layer"
        A[Mobile App]
        B[Web Browser] 
        C[Smart TV]
        D[Gaming Console]
    end
    
    subgraph "CDN Network"
        CDN1[Edge Server<br/>US East]
        CDN2[Edge Server<br/>EU West]
        CDN3[Edge Server<br/>Asia Pacific]
        CDN4[Edge Server<br/>Regional]
    end
    
    subgraph "Load Balancer & API Gateway"
        LB[Load Balancer<br/>NGINX/ALB]
        GW[API Gateway<br/>Kong]
    end
    
    subgraph "Application Services"
        VS[Video Service<br/>Java/Go]
        US[User Service<br/>Java/Go]
        SS[Search Service<br/>Java/Go]
        RS[Recommendation Service<br/>Python/Go]
        AS[Analytics Service<br/>Java/Go]
        UpS[Upload Service<br/>Java/Go]
    end
    
    subgraph "Video Processing Pipeline"
        Q[Message Queue<br/>Kafka/SQS]
        TC1[Transcoding Worker 1<br/>FFmpeg]
        TC2[Transcoding Worker 2<br/>FFmpeg]
        TC3[Transcoding Worker N<br/>FFmpeg]
    end
    
    subgraph "Databases"
        PG[(PostgreSQL<br/>Video Metadata<br/>User Data)]
        ES[(Elasticsearch<br/>Search Index)]
        CA[(Cassandra<br/>Analytics Data)]
        RD[(Redis<br/>Cache & Sessions)]
    end
    
    subgraph "Storage"
        S3[Object Storage<br/>AWS S3/GCS<br/>Raw & Processed Videos]
        THUMB[Thumbnail Storage<br/>Image CDN]
    end
    
    subgraph "ML & Analytics"
        ML[ML Pipeline<br/>Recommendations<br/>Content Analysis]
        SPARK[Spark Cluster<br/>Batch Analytics]
    end
    
    subgraph "Monitoring"
        MON[Monitoring<br/>Prometheus/Grafana]
        LOG[Logging<br/>ELK Stack]
    end
    
    %% Client to CDN
    A --> CDN1
    B --> CDN2  
    C --> CDN3
    D --> CDN4
    
    %% Client to Load Balancer
    A --> LB
    B --> LB
    C --> LB
    D --> LB
    
    %% Load Balancer to Gateway
    LB --> GW
    
    %% Gateway to Services
    GW --> VS
    GW --> US
    GW --> SS
    GW --> RS
    GW --> AS
    GW --> UpS
    
    %% Services to Databases
    VS --> PG
    US --> PG
    SS --> ES
    RS --> RD
    AS --> CA
    
    %% Upload and Processing Flow
    UpS --> S3
    UpS --> Q
    Q --> TC1
    Q --> TC2 
    Q --> TC3
    TC1 --> S3
    TC2 --> S3
    TC3 --> S3
    
    %% CDN pulls from Storage
    S3 --> CDN1
    S3 --> CDN2
    S3 --> CDN3
    S3 --> CDN4
    
    %% Analytics and ML
    AS --> SPARK
    SPARK --> ML
    ML --> RS
    
    %% Caching
    VS --> RD
    US --> RD
    SS --> RD
    
    %% Thumbnails
    THUMB --> CDN1
    THUMB --> CDN2
    THUMB --> CDN3
    THUMB --> CDN4
    
    %% Monitoring
    MON -.-> VS
    MON -.-> US
    MON -.-> SS
    LOG -.-> VS
    LOG -.-> US
```

## How to View This Diagram

1. **GitHub/GitLab**: This Mermaid diagram will render automatically when viewing the file
2. **VS Code**: Install the "Mermaid Preview" extension
3. **Online**: Copy the diagram code to [mermaid.live](https://mermaid.live)
4. **Documentation sites**: Works with GitBook, Notion, etc. 