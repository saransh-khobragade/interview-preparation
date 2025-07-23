# Ride Sharing Service Architecture Diagram

```mermaid
graph TB
    subgraph "Client Applications"
        RA[Rider Mobile App<br/>iOS/Android]
        DA[Driver Mobile App<br/>iOS/Android]
        WA[Web Application<br/>Admin/Support]
    end
    
    subgraph "Load Balancer & CDN"
        LB[Load Balancer<br/>Geographic Routing<br/>NGINX/ALB]
        CDN[CDN<br/>Static Assets<br/>CloudFront]
    end
    
    subgraph "API Gateway"
        GW[API Gateway<br/>Kong/AWS API Gateway<br/>Rate Limiting, Auth]
    end
    
    subgraph "Core Services"
        US[User Service<br/>Profiles, Auth]
        DS[Driver Service<br/>Driver Management]
        TS[Trip Service<br/>Trip Lifecycle]
        LS[Location Service<br/>Geospatial Queries]
        PS[Payment Service<br/>Billing & Payments]
        NS[Notification Service<br/>Push & SMS]
    end
    
    subgraph "Real-time Services"
        WS[WebSocket Service<br/>Real-time Updates<br/>Node.js/Socket.io]
        MS[Matching Service<br/>Driver-Rider Matching<br/>Go/Java]
        RS[Route Service<br/>Navigation & ETA<br/>Go]
    end
    
    subgraph "Message Queue & Events"
        K[Apache Kafka<br/>Event Streaming<br/>Location Updates]
        RQ[Redis Pub/Sub<br/>Real-time Events]
    end
    
    subgraph "Databases"
        PG[(PostgreSQL<br/>User Data<br/>Trip Data)]
        REDIS[(Redis Cluster<br/>Location Cache<br/>Session Data)]
        CASS[(Cassandra<br/>Historical Location<br/>Analytics Data)]
    end
    
    subgraph "Geospatial & External"
        GEO[Geospatial DB<br/>PostGIS/MongoDB<br/>Location Indexing]
        MAPS[Maps API<br/>Google Maps/Mapbox<br/>Routing & Traffic]
        PAY[Payment Gateway<br/>Stripe/PayPal<br/>Local Providers]
    end
    
    subgraph "Analytics & ML"
        SPARK[Spark Cluster<br/>Batch Analytics<br/>Demand Prediction]
        ML[ML Pipeline<br/>Surge Pricing<br/>Driver Positioning]
        STREAM[Stream Processing<br/>Real-time Analytics<br/>Kafka Streams]
    end
    
    subgraph "Monitoring & Support"
        MON[Monitoring<br/>Prometheus/Grafana<br/>System Health]
        LOG[Logging<br/>ELK Stack<br/>Application Logs]
        ALERT[Alerting<br/>PagerDuty<br/>Incident Response]
    end
    
    %% Client connections
    RA --> LB
    DA --> LB
    WA --> LB
    
    %% Load balancer routing
    LB --> GW
    LB --> WS
    
    %% API Gateway routing
    GW --> US
    GW --> DS
    GW --> TS
    GW --> LS
    GW --> PS
    GW --> NS
    
    %% Real-time service connections
    WS --> MS
    WS --> RQ
    MS --> LS
    MS --> TS
    RS --> MAPS
    
    %% Service to database connections
    US --> PG
    DS --> PG
    TS --> PG
    LS --> REDIS
    LS --> GEO
    PS --> PAY
    
    %% Message queue connections
    LS --> K
    K --> MS
    K --> STREAM
    RQ --> WS
    
    %% External service integrations
    NS --> RA
    NS --> DA
    RS --> MAPS
    PS --> PAY
    
    %% Analytics pipeline
    PG --> SPARK
    REDIS --> STREAM
    CASS --> SPARK
    SPARK --> ML
    ML --> MS
    ML --> PS
    
    %% Monitoring connections
    MON -.-> US
    MON -.-> DS
    MON -.-> TS
    LOG -.-> US
    LOG -.-> DS
    ALERT -.-> MON
    
    %% CDN for static content
    CDN --> RA
    CDN --> DA
    CDN --> WA
    
    %% Historical data storage
    K --> CASS
    LS --> CASS
```

## How to View This Diagram

1. **GitHub/GitLab**: This Mermaid diagram will render automatically when viewing the file
2. **VS Code**: Install the "Mermaid Preview" extension
3. **Online**: Copy the diagram code to [mermaid.live](https://mermaid.live)
4. **Documentation sites**: Works with GitBook, Notion, etc. 