# E-commerce Platform Architecture Diagram

```mermaid
graph TB
    subgraph "Client Layer"
        WEB[Web Application<br/>React Next.js]
        MOB[Mobile Apps<br/>iOS Android React Native]
        ADMIN[Admin Dashboard<br/>Seller Portal]
    end
    
    subgraph "Load Balancer & CDN"
        LB[Load Balancer<br/>AWS ALB NGINX<br/>SSL Termination]
        CDN[CDN Network<br/>CloudFront Cloudinary<br/>Product Images]
    end
    
    subgraph "API Gateway"
        GW[API Gateway<br/>Kong AWS API Gateway<br/>Rate Limiting Auth Routing]
    end
    
    subgraph "Core Microservices"
        PS[Product Service<br/>Catalog Management<br/>Java Spring Boot]
        US[User Service<br/>Authentication Profiles<br/>Java]
        CS[Cart Service<br/>Shopping Cart<br/>Go Redis]
        OS[Order Service<br/>Order Management<br/>Java]
        IS[Inventory Service<br/>Stock Management<br/>Go]
        PayS[Payment Service<br/>Transaction Processing<br/>Java]
    end
    
    subgraph "Search & Recommendation"
        SS[Search Service<br/>Product Search<br/>Java]
        RS[Recommendation Service<br/>ML Recommendations<br/>Python]
        ES[(Elasticsearch<br/>Product Search Index<br/>Full-text Search)]
    end
    
    subgraph "Business Services"
        NS[Notification Service<br/>Email SMS Push<br/>Node.js]
        AS[Analytics Service<br/>Business Intelligence<br/>Python]
        MS[Media Service<br/>Image Upload Processing<br/>Go]
        ReviewS[Review Service<br/>Ratings Reviews<br/>Java]
    end
    
    subgraph "Message Queue & Events"
        KAFKA[Apache Kafka<br/>Event Streaming<br/>Order Events Inventory]
        REDIS_QUEUE[Redis Queue<br/>Task Processing<br/>Async Jobs]
    end
    
    subgraph "Databases"
        PG_USER[(PostgreSQL<br/>User Data<br/>Master Replica)]
        PG_PRODUCT[(PostgreSQL<br/>Product Catalog<br/>Master Replica)]
        PG_ORDER[(PostgreSQL<br/>Order Data<br/>Sharded by User)]
        REDIS[(Redis Cluster<br/>Cart Data Sessions<br/>Hot Inventory)]
    end
    
    subgraph "Analytics & ML"
        CLICKHOUSE[(ClickHouse<br/>Analytics Data<br/>Time-series Events)]
        SPARK[Apache Spark<br/>Batch Processing<br/>ML Pipeline]
        ML[ML Models<br/>Recommendations<br/>Fraud Detection]
    end
    
    subgraph "External Services"
        PAY[Payment Gateways<br/>Stripe PayPal<br/>Local Providers]
        SHIP[Shipping APIs<br/>FedEx UPS DHL<br/>Tracking Labels]
        EMAIL[Email SMS<br/>SendGrid Twilio<br/>Notifications]
        STORAGE[Object Storage<br/>AWS S3<br/>Product Images]
    end
    
    subgraph "Monitoring & Security"
        PROM[Prometheus<br/>Metrics Collection]
        GRAF[Grafana<br/>Dashboards Alerts]
        LOG[ELK Stack<br/>Centralized Logging]
        SEC[Security Services<br/>Fraud Detection WAF]
    end
    
    %% Client connections
    WEB --> LB
    MOB --> LB
    ADMIN --> LB
    
    %% CDN for static content
    STORAGE --> CDN
    CDN --> WEB
    CDN --> MOB
    CDN --> ADMIN
    
    %% Load balancer to API Gateway
    LB --> GW
    
    %% API Gateway to core services
    GW --> PS
    GW --> US
    GW --> CS
    GW --> OS
    GW --> IS
    GW --> PayS
    
    %% API Gateway to business services
    GW --> SS
    GW --> RS
    GW --> NS
    GW --> AS
    GW --> MS
    GW --> ReviewS
    
    %% Core service database connections
    PS --> PG_PRODUCT
    US --> PG_USER
    CS --> REDIS
    OS --> PG_ORDER
    IS --> REDIS
    PayS --> PG_ORDER
    
    %% Search and recommendations
    PS --> ES
    SS --> ES
    RS --> ML
    ML --> CLICKHOUSE
    
    %% Event streaming
    OS --> KAFKA
    IS --> KAFKA
    PayS --> KAFKA
    KAFKA --> NS
    KAFKA --> AS
    
    %% Async processing
    NS --> REDIS_QUEUE
    AS --> REDIS_QUEUE
    MS --> REDIS_QUEUE
    
    %% Analytics pipeline
    KAFKA --> CLICKHOUSE
    CLICKHOUSE --> SPARK
    SPARK --> ML
    
    %% External integrations
    PayS --> PAY
    OS --> SHIP
    NS --> EMAIL
    MS --> STORAGE
    
    %% Cross-service communication
    CS --> PS
    CS --> IS
    OS --> IS
    OS --> PayS
    ReviewS --> OS
    
    %% Monitoring
    PROM -.-> PS
    PROM -.-> US
    PROM -.-> CS
    PROM -.-> OS
    GRAF -.-> PROM
    LOG -.-> PS
    LOG -.-> US
    LOG -.-> CS
    
    %% Security
    SEC -.-> GW
    SEC -.-> PayS
```

## How to View This Diagram

1. **GitHub/GitLab**: This Mermaid diagram will render automatically when viewing the file
2. **VS Code**: Install the "Mermaid Preview" extension
3. **Online**: Copy the diagram code to [mermaid.live](https://mermaid.live)
4. **Documentation sites**: Works with GitBook, Notion, etc. 