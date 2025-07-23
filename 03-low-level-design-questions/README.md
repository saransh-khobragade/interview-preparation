# Low Level Design Questions

Top 10 trending low-level design questions with TypeScript implementations, focusing on clean architecture and design patterns.

## 📁 **System Designs Included**

### **1. URL Shortener** (`1-url-shortener/`)
**Similar to:** bit.ly, tinyurl
- Shorten long URLs to short codes
- Custom aliases support
- Click analytics tracking
- URL expiration handling
- **Patterns:** Repository, Strategy, Dependency Injection

### **2. Chat System** (`2-chat-system/`)
**Similar to:** WhatsApp, Slack
- Real-time messaging
- Group chats and direct messages
- Online presence management
- File sharing support
- **Patterns:** Observer, Repository, Command

### **3. Parking Lot System** (`3-parking-lot/`)
**Similar to:** Smart parking systems
- Multiple vehicle and spot types
- Automated fee calculation
- Spot finding algorithms
- Entry/exit management
- **Patterns:** Strategy, Factory, State, Repository

### **4. Ride Sharing** (`4-ride-sharing/`)
**Similar to:** Uber, Lyft
- Ride booking and matching
- Driver assignment strategies
- Real-time tracking
- Dynamic pricing
- **Patterns:** Strategy, State, Observer, Repository

### **5. Library Management** (`5-library-management/`)
**Similar to:** University/public library systems
- Book catalog management
- Borrowing and returning
- Fine calculation
- Reservation system
- **Patterns:** Strategy, Repository, Command, Factory

### **6. Food Delivery** (`6-food-delivery/`)
**Similar to:** UberEats, DoorDash
- Restaurant and menu management
- Order placement and tracking
- Delivery partner assignment
- Payment processing
- **Patterns:** Strategy, State, Repository, Observer

### **7. Social Media Platform** (`7-social-media/`)
**Similar to:** Twitter, Instagram
- User posts and feeds
- Follow/unfollow relationships
- Like and comment system
- News feed generation
- **Patterns:** Strategy, Observer, Repository, Factory

### **8. Shopping Cart** (`8-shopping-cart/`)
**Similar to:** Amazon, E-commerce
- Add/remove items from cart
- Inventory management
- Pricing and discount strategies
- Checkout and order processing
- **Patterns:** Strategy, State, Command, Repository

### **9. Notification Service** (`9-notification-service/`)
**Similar to:** Firebase, SendGrid
- Multi-channel notifications (email, SMS, push)
- Template management
- User preferences and rate limiting
- Delivery tracking
- **Patterns:** Strategy, Template Method, Observer

### **10. Task Management** (`10-task-management/`)
**Similar to:** Jira, Trello
- Task creation and assignment
- Project organization
- Status tracking and workflows
- Activity logging and search
- **Patterns:** Strategy, Command, Observer, Repository

## 🎯 **Design Principles Demonstrated**

### **SOLID Principles**
- **S** - Single Responsibility: Each class has one reason to change
- **O** - Open/Closed: Extensible without modification
- **L** - Liskov Substitution: Subtypes are substitutable
- **I** - Interface Segregation: Small, focused interfaces
- **D** - Dependency Inversion: Depend on abstractions

### **Key Design Patterns**
- **Repository Pattern** - Data access abstraction
- **Strategy Pattern** - Interchangeable algorithms
- **Observer Pattern** - Event-driven communication
- **Factory Pattern** - Object creation abstraction
- **State Pattern** - Status management
- **Command Pattern** - Request encapsulation

## 🏗️ **Architecture Overview**

Each design follows a layered architecture:

```
┌─────────────────────────┐
│     Service Layer       │  ← Business Logic
├─────────────────────────┤
│   Repository Layer      │  ← Data Access
├─────────────────────────┤
│     Domain Models       │  ← Core Entities
└─────────────────────────┘
```

### **Common Components**

#### **Domain Models**
```typescript
interface Entity {
  id: string;
  createdAt: Date;
  // ... entity-specific properties
}
```

#### **Repository Pattern**
```typescript
interface Repository<T> {
  save(entity: T): Promise<void>;
  findById(id: string): Promise<T | null>;
  // ... entity-specific queries
}
```

#### **Service Layer**
```typescript
class Service {
  constructor(
    private repository: Repository,
    private externalService: ExternalService
  ) {}
  
  async businessMethod(): Promise<Result> {
    // Business logic implementation
  }
}
```

## 💡 **Interview Tips**

### **How to Approach LLD Questions:**

1. **Clarify Requirements** (5 minutes)
   - Ask about scale, users, features
   - Define functional and non-functional requirements
   - Identify core use cases

2. **Design Core Entities** (10 minutes)
   - Define main domain models
   - Establish relationships between entities
   - Choose appropriate data types

3. **Define APIs/Interfaces** (10 minutes)
   - Service layer methods
   - Repository interfaces
   - External service contracts

4. **Implement Core Logic** (15 minutes)
   - Focus on 2-3 main use cases
   - Apply design patterns appropriately
   - Handle edge cases and validation

5. **Discuss Scalability** (5 minutes)
   - Database design considerations
   - Caching strategies
   - Performance optimizations

### **Common Interview Questions:**

#### **Design Patterns:**
- "Why did you choose the Repository pattern?"
- "How would you implement caching in this design?"
- "What happens if the external service is down?"

#### **Scalability:**
- "How would you handle 1 million concurrent users?"
- "What database would you choose and why?"
- "How would you implement rate limiting?"

#### **Trade-offs:**
- "What are the pros and cons of your approach?"
- "How would you handle eventual consistency?"
- "What monitoring would you add?"

## 🔧 **Implementation Guidelines**

### **TypeScript Best Practices**
```typescript
// ✅ Good: Strong typing with interfaces
interface CreateUserRequest {
  name: string;
  email: string;
  type: UserType;
}

// ✅ Good: Enum for constants
enum UserType {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN'
}

// ✅ Good: Error handling with custom exceptions
class UserNotFoundException extends Error {
  constructor(userId: string) {
    super(`User with ID ${userId} not found`);
  }
}
```

### **Design Pattern Implementation**
```typescript
// Strategy Pattern Example
interface PricingStrategy {
  calculatePrice(basePrice: number): number;
}

class PremiumPricing implements PricingStrategy {
  calculatePrice(basePrice: number): number {
    return basePrice * 1.5;
  }
}

class DiscountPricing implements PricingStrategy {
  calculatePrice(basePrice: number): number {
    return basePrice * 0.8;
  }
}
```

## 📊 **Scalability Considerations**

### **Database Design**
- **Indexing:** Primary keys, foreign keys, search fields
- **Sharding:** Horizontal partitioning by user ID or geographic region
- **Read Replicas:** Separate read and write operations

### **Caching Strategy**
- **Application Cache:** In-memory caching for frequently accessed data
- **Distributed Cache:** Redis for session data and temporary storage
- **CDN:** Static assets and geographic distribution

### **Performance Optimization**
- **Connection Pooling:** Efficient database connections
- **Async Processing:** Background jobs for non-critical operations
- **Rate Limiting:** Prevent abuse and ensure fair usage

### **Monitoring & Observability**
- **Metrics:** Response times, error rates, throughput
- **Logging:** Structured logging with correlation IDs
- **Health Checks:** Service availability monitoring

## 🚀 **Next Steps for Practice**

1. **Implement Additional Features:**
   - Add authentication and authorization
   - Implement real-time notifications
   - Add comprehensive error handling

2. **Enhance with Advanced Patterns:**
   - Circuit Breaker for external services
   - Event Sourcing for audit trails
   - CQRS for read/write separation

3. **Add Infrastructure Components:**
   - Docker containerization
   - API gateway integration
   - Message queue implementation

4. **Practice Variations:**
   - Design similar systems (Twitter → Social Media Platform)
   - Handle different scale requirements
   - Implement different business rules

Remember: The goal is to demonstrate your understanding of software engineering principles, not to write production-ready code in 45 minutes! 🎯 