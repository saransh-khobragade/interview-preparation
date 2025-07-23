# Design an E-commerce Platform (Amazon/eBay)

## 📋 **Requirements**

### **Functional Requirements**
- Product catalog with search and filtering
- User registration, authentication, and profiles
- Shopping cart and wishlist management
- Checkout process with multiple payment options
- Order management and tracking
- Inventory management for sellers
- Review and rating system
- Recommendation engine
- Seller dashboard and analytics

### **Non-Functional Requirements**
- **Scale:** 100M active users, 10M products, 1M orders per day
- **Availability:** 99.99% uptime (especially during peak shopping events)
- **Performance:** < 200ms page load time, < 100ms search response
- **Consistency:** Strong consistency for payments/inventory, eventual for recommendations
- **Peak Load:** Handle 50x traffic during flash sales (Black Friday, Prime Day)

## 🎯 **Capacity Estimation**

### **User Activity**
- **Daily Active Users:** 100M
- **Product Views:** 10B page views/day (~115K QPS)
- **Orders:** 1M orders/day (~12 orders/second)
- **Peak Traffic:** 50x during flash sales = 5.75M QPS
- **Search Queries:** 500M searches/day (~5.8K QPS)

### **Storage Requirements**
- **Product Data:** 10M products × 5KB = 50GB
- **Product Images:** 10M products × 10 images × 500KB = 50TB
- **User Data:** 100M users × 2KB = 200GB
- **Order Data:** 1M orders/day × 2KB = 2GB/day (700GB/year)
- **Transaction Logs:** 10GB/day for audit trails

### **Inventory Updates**
- **Inventory Changes:** 100M updates/day (~1,160 updates/second)
- **Price Updates:** 1M price changes/day (~12 updates/second)
- **Peak Inventory Load:** During flash sales, 50K updates/second

## 🏗️ **High-Level Architecture**

The e-commerce platform uses a microservices architecture with separate services for catalog, cart, checkout, payments, and order management. The system is designed for high availability with multi-region deployment.

## 📊 **Database Design**

### **User Service Database**
```sql
users: user_id, email, username, password_hash, first_name, last_name, phone, created_at, status
user_addresses: address_id, user_id, street, city, state, country, postal_code, is_default
user_payment_methods: payment_id, user_id, type, encrypted_details, is_default, created_at
user_preferences: user_id, language, currency, notification_settings
```

### **Product Catalog Database**
```sql
products: product_id, seller_id, title, description, brand, category_id, created_at, status
product_variants: variant_id, product_id, sku, price, currency, attributes (size, color), stock_quantity
product_images: image_id, product_id, image_url, alt_text, display_order
categories: category_id, name, parent_category_id, description, level
brands: brand_id, name, description, logo_url
```

### **Inventory Database**
```sql
inventory: sku, warehouse_id, available_quantity, reserved_quantity, last_updated
warehouse_locations: warehouse_id, name, address, coordinates, capacity
stock_movements: movement_id, sku, warehouse_id, type (in/out/transfer), quantity, timestamp, reason
```

### **Shopping Cart Database**
```sql
shopping_carts: cart_id, user_id, created_at, updated_at, status
cart_items: item_id, cart_id, product_id, variant_id, quantity, added_at, price_snapshot
wishlists: wishlist_id, user_id, product_id, variant_id, added_at
```

### **Order Management Database**
```sql
orders: order_id, user_id, total_amount, currency, status, shipping_address_id, payment_method_id, created_at
order_items: item_id, order_id, product_id, variant_id, quantity, unit_price, total_price
order_status_history: status_id, order_id, status, timestamp, notes
shipping_info: shipping_id, order_id, carrier, tracking_number, estimated_delivery, actual_delivery
```

### **Reviews & Ratings Database**
```sql
reviews: review_id, user_id, product_id, order_id, rating, title, content, created_at, status
review_images: image_id, review_id, image_url
review_helpfulness: user_id, review_id, is_helpful
```

## 🔌 **API Design**

### **Product Catalog APIs**
```
GET /api/v1/products?category={category}&page={page} - Browse products
GET /api/v1/products/{product_id} - Get product details
GET /api/v1/search/products?q={query}&filters={filters} - Search products
GET /api/v1/categories - Get category tree
GET /api/v1/products/{product_id}/reviews - Get product reviews
GET /api/v1/recommendations/{user_id} - Get personalized recommendations
```

### **Shopping Cart APIs**
```
GET /api/v1/cart/{user_id} - Get user's cart
POST /api/v1/cart/{user_id}/items - Add item to cart
PUT /api/v1/cart/{user_id}/items/{item_id} - Update cart item quantity
DELETE /api/v1/cart/{user_id}/items/{item_id} - Remove item from cart
POST /api/v1/cart/{user_id}/checkout - Initiate checkout process
```

### **Order Management APIs**
```
POST /api/v1/orders - Create new order
GET /api/v1/orders/{order_id} - Get order details
GET /api/v1/users/{user_id}/orders - Get user's order history
PUT /api/v1/orders/{order_id}/cancel - Cancel order
GET /api/v1/orders/{order_id}/tracking - Get shipping tracking info
```

### **Payment APIs**
```
POST /api/v1/payments/process - Process payment
GET /api/v1/payments/{payment_id}/status - Get payment status
POST /api/v1/payments/{payment_id}/refund - Process refund
GET /api/v1/users/{user_id}/payment-methods - Get saved payment methods
```

### **Seller APIs**
```
POST /api/v1/seller/products - Create product listing
PUT /api/v1/seller/products/{product_id}/inventory - Update inventory
GET /api/v1/seller/orders - Get seller's orders
GET /api/v1/seller/analytics - Get sales analytics
PUT /api/v1/seller/products/{product_id}/price - Update product price
```

## ⚡ **Technology Stack**

### **Application Layer**
- **API Gateway:** Kong, AWS API Gateway with rate limiting and authentication
- **Load Balancer:** AWS Application Load Balancer, NGINX
- **Microservices:** Java Spring Boot, Go for high-performance services

### **Frontend**
- **Web Application:** React.js with Next.js for server-side rendering
- **Mobile Apps:** React Native or native iOS/Android
- **Admin Dashboard:** React.js with TypeScript

### **Databases**
- **User Data:** PostgreSQL with read replicas
- **Product Catalog:** Elasticsearch for search, PostgreSQL for structured data
- **Inventory:** Redis for real-time inventory, PostgreSQL for persistence
- **Orders:** PostgreSQL with sharding by user_id
- **Analytics:** ClickHouse for time-series data

### **Caching & Message Queues**
- **Cache:** Redis Cluster for session data, hot products
- **Message Queue:** Apache Kafka for event streaming
- **Task Queue:** Celery with Redis for async processing

### **External Services**
- **Payment Gateway:** Stripe, PayPal, local payment providers
- **Shipping:** FedEx, UPS, DHL APIs for tracking and rates
- **Email/SMS:** SendGrid, Twilio for notifications
- **Image CDN:** CloudFront, Cloudinary for product images

## 🛒 **Shopping Cart Architecture**

### **Cart Storage Strategy**
- **Guest Users:** Browser localStorage with Redis backup
- **Logged-in Users:** Database persistence with Redis cache
- **Cart Expiration:** 30 days for logged-in users, 7 days for guests
- **Cart Merging:** Merge guest cart with user cart on login

### **Cart Synchronization**
- **Real-time Updates:** WebSocket for multi-device synchronization
- **Conflict Resolution:** Last-write-wins with timestamp comparison
- **Offline Support:** Local storage with sync on reconnection

## 💳 **Checkout & Payment Flow**

### **Checkout Process**
1. **Cart Review** → Validate items, prices, and availability
2. **Shipping Options** → Calculate shipping costs and delivery times
3. **Payment Selection** → Choose payment method and billing address
4. **Order Review** → Final order confirmation with total cost
5. **Payment Processing** → Secure payment through gateway
6. **Order Creation** → Create order record and reserve inventory
7. **Confirmation** → Send email/SMS confirmation to user

### **Payment Processing**
- **Payment Gateway Integration:** Support multiple payment methods
- **Security:** PCI DSS compliance, tokenization of card data
- **Fraud Detection:** Machine learning models for fraud prevention
- **3D Secure:** Additional authentication for high-risk transactions
- **Retry Logic:** Handle payment failures with automatic retries

### **Inventory Reservation**
- **Soft Reservation:** Reserve items during checkout (15-minute window)
- **Hard Reservation:** Confirm reservation after successful payment
- **Timeout Handling:** Release reservations after timeout
- **Overselling Prevention:** Real-time inventory checks

## 📦 **Order Management System**

### **Order Lifecycle**
```
Order States: PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED → COMPLETED
Cancel States: CANCELLED → REFUND_PENDING → REFUNDED
Return States: RETURN_REQUESTED → RETURN_APPROVED → RETURN_RECEIVED → REFUNDED
```

### **Order Processing Pipeline**
1. **Order Confirmation** → Validate payment and inventory
2. **Warehouse Assignment** → Route to optimal fulfillment center
3. **Picking & Packing** → Generate pick lists and pack orders
4. **Shipping** → Generate shipping labels and tracking numbers
5. **Delivery Updates** → Track packages and update customers
6. **Completion** → Mark order as delivered and trigger reviews

### **Fulfillment Optimization**
- **Warehouse Selection:** Choose warehouse closest to customer
- **Multi-warehouse Orders:** Split orders across warehouses if needed
- **Priority Handling:** Expedite premium member orders
- **Batch Processing:** Group orders for efficient picking

## 🔍 **Search & Recommendation System**

### **Product Search**
- **Elasticsearch Cluster:** Full-text search with relevance scoring
- **Search Features:**
  - Auto-complete and spell correction
  - Faceted search (price, brand, rating, availability)
  - Visual search using image recognition
  - Voice search integration

### **Search Ranking Factors**
- **Relevance:** Query match quality and product attributes
- **Popularity:** Sales volume, view count, conversion rate
- **User Preference:** Purchase history, browsing behavior
- **Business Rules:** Promoted products, margin optimization
- **Inventory:** Prioritize in-stock items

### **Recommendation Engine**
- **Collaborative Filtering:** Users with similar purchase patterns
- **Content-Based Filtering:** Product features and attributes
- **Deep Learning:** Neural networks for complex pattern recognition
- **Real-time Personalization:** Update recommendations based on current session
- **A/B Testing:** Continuous experimentation with recommendation algorithms

## 🚀 **Scalability Solutions**

### **Database Scaling**
- **Read Replicas:** Multiple read replicas for catalog queries
- **Sharding:** Partition orders by user_id, products by category
- **Caching Strategy:** Multi-level caching (CDN, Redis, application)
- **Connection Pooling:** Efficient database connection management

### **Microservices Scaling**
- **Auto-scaling:** Kubernetes with horizontal pod autoscaling
- **Service Mesh:** Istio for service-to-service communication
- **Circuit Breakers:** Prevent cascade failures
- **Load Balancing:** Round-robin with health checks

### **Peak Traffic Handling**
- **CDN:** Aggressive caching of static content
- **Queue-based Processing:** Async processing of non-critical operations
- **Rate Limiting:** Protect services from traffic spikes
- **Feature Flags:** Disable non-essential features during peak load

## 🚨 **Potential Bottlenecks & Solutions**

### **Inventory Consistency**
- **Problem:** Overselling due to concurrent inventory updates
- **Solution:** Pessimistic locking, saga pattern, event sourcing

### **Search Performance**
- **Problem:** Slow search queries during peak traffic
- **Solution:** Elasticsearch optimization, result caching, query pre-warming

### **Payment Processing**
- **Problem:** Payment gateway timeouts during high load
- **Solution:** Multiple payment providers, async payment processing, retry logic

### **Database Hot Spots**
- **Problem:** Popular products creating database bottlenecks
- **Solution:** Read replicas, aggressive caching, database sharding

## 📊 **Analytics & Business Intelligence**

### **Real-time Metrics**
- **Sales Dashboard:** Revenue, orders, conversion rates by minute
- **Inventory Alerts:** Low stock warnings, out-of-stock notifications
- **Performance Monitoring:** Page load times, API response times
- **User Behavior:** Real-time user journey tracking

### **Business Analytics**
- **Sales Analysis:** Revenue trends, seasonal patterns, product performance
- **Customer Analytics:** LTV, churn rate, segment analysis
- **Inventory Optimization:** Demand forecasting, reorder point optimization
- **Pricing Strategy:** Dynamic pricing based on demand and competition

### **Machine Learning Applications**
- **Demand Forecasting:** Predict future demand for inventory planning
- **Dynamic Pricing:** Optimize prices based on market conditions
- **Fraud Detection:** Identify suspicious transactions and behaviors
- **Customer Segmentation:** Group customers for targeted marketing

## 🔒 **Security & Compliance**

### **Data Security**
- **Encryption:** End-to-end encryption for sensitive data
- **PCI DSS Compliance:** Secure payment card data handling
- **GDPR Compliance:** Data privacy and user consent management
- **Access Control:** Role-based access with principle of least privilege

### **Fraud Prevention**
- **Machine Learning Models:** Real-time fraud detection
- **Risk Scoring:** Assess transaction risk based on multiple factors
- **Device Fingerprinting:** Track devices for suspicious activity
- **Manual Review:** Human review for high-risk transactions

## 🔍 **Monitoring & Observability**

### **Application Monitoring**
- **APM Tools:** New Relic, DataDog for application performance
- **Error Tracking:** Sentry for exception monitoring
- **Log Aggregation:** ELK Stack for centralized logging
- **Distributed Tracing:** Jaeger for request tracing across services

### **Business Metrics**
- **KPIs:** Conversion rate, average order value, customer acquisition cost
- **SLA Monitoring:** API uptime, response time, error rates
- **Alert Management:** PagerDuty for incident response
- **Dashboard:** Grafana for real-time metrics visualization

### **Performance Optimization**
- **CDN Analytics:** Cache hit rates, origin load
- **Database Performance:** Query optimization, index usage
- **Memory Usage:** JVM heap monitoring, memory leaks detection
- **Cost Optimization:** AWS cost monitoring and optimization 